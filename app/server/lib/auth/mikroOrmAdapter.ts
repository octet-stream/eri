import type {EntityProperty, FindOptions, MikroORM} from "@mikro-orm/core"
import type {Adapter, BetterAuthOptions, Where} from "better-auth"
import {serialize, ReferenceKind} from "@mikro-orm/core"
import {pascalCase, camelCase} from "scule"
import {BetterAuthError} from "better-auth"
import {dset} from "dset"

/**
 * Normalizes given model `name` for Mikro ORM
 *
 * @param name - The name of the entity
 */
const normalizeEntityName = (name: string) => pascalCase(name)

/**
 * Prefixes given `error` message
 *
 * @param message - A message to add a prefix to
 */
const prefixErrorMessage = (message: string) => `Mikro ORM Adapter: ${message}`

/**
 * Returns metadata for given `entityName` from MetadataStorage.
 *
 * @param orm - Mikro ORM instance
 * @param entityName - The name of the entity to get the metadata for
 *
 * @throws BetterAuthError when no metadata found
 */
function getEntityMetadata(orm: MikroORM, entityName: string) {
  const storage = orm.getMetadata()

  if (!storage.has(entityName)) {
    throw new BetterAuthError(
      prefixErrorMessage(
        `Cannot find metadata for "${entityName}" entity. Make sure it defined and listed in your Mikro ORM config.`
      )
    )
  }

  return storage.get(entityName)
}

/**
 * Normalizes the Mikro ORM output for Better Auth
 *
 * @param orm - Mikro ORM instance
 * @param entityName - The name of the entity
 * @param output - The result of a Mikro ORM query
 */
function normalizeOutput(
  orm: MikroORM,
  entityName: string,
  output: Record<string, any>
) {
  const metadata = getEntityMetadata(orm, entityName)
  output = serialize(output)

  if (metadata.relations.length === 0) {
    return output
  }

  const relations = metadata.relations.map(rel => ({
    name: rel.name,
    fk: camelCase(rel.ownColumns[0])
  }))

  const mappedOutput = relations.map(({name, fk}) => [fk, output[name]])

  const overrides = relations.map(({name}) => name)

  const filteredOutput = Object.entries(output).filter(
    ([key]) => !overrides.includes(key)
  )

  return Object.fromEntries([...filteredOutput, ...mappedOutput])
}

/**
 * Returns name of the field from a relation
 *
 * @param fieldName - The name of the field
 * @param property - Property metadata
 */
function getFieldNameFromRelation(
  fieldName: string,
  property: EntityProperty
): string {
  const field = property.fieldNames.find(col => camelCase(col) === fieldName)

  if (!field) {
    throw new BetterAuthError(
      prefixErrorMessage("Cannot find field for this relation")
    )
  }

  return camelCase(field)
}

/**
 * Returns a path to a `field` reference.
 *
 * @param orm - Mikro ORM instance
 * @param entityName - The name of the entity
 * @param fieldName - The field's name
 *
 * @throws BetterAuthError when no such field exist on the `entity`
 * @throws BetterAuthError if complex primary key is discovered in `fieldName` relation
 */
function getFieldPath(orm: MikroORM, entityName: string, fieldName: string) {
  const metadata = getEntityMetadata(orm, entityName)

  const fieldMetadata = metadata.props.find(prop => {
    // Ignore Shadow Properties. See: https://mikro-orm.io/docs/serializing#shadow-properties
    if (prop.persist === false) {
      return false
    }

    if (prop.kind === ReferenceKind.SCALAR && prop.name === fieldName) {
      return true
    }

    if (
      prop.kind === ReferenceKind.MANY_TO_ONE &&
      getFieldNameFromRelation(fieldName, prop)
    ) {
      return true
    }

    return false
  })

  if (!fieldMetadata) {
    throw new BetterAuthError(
      prefixErrorMessage(
        `The field "${fieldName}" does not exist in "${entityName}" entity. Please update the entity.`
      )
    )
  }

  if (fieldMetadata.kind === ReferenceKind.SCALAR) {
    return [fieldMetadata.name]
  }

  if (fieldMetadata.kind === ReferenceKind.MANY_TO_ONE) {
    if (fieldMetadata.referencedPKs.length > 1) {
      throw new BetterAuthError(
        prefixErrorMessage(
          `The "${fieldName}" field references to a table "${fieldMetadata.name}" with complex primary key, which is not supported`
        )
      )
    }

    return [fieldMetadata.name, fieldMetadata.referencedPKs[0]]
  }

  throw new BetterAuthError(
    prefixErrorMessage(
      `Cannot normalize "${fieldName}" field name into path for "${entityName} entity."`
    )
  )
}

/**
 * Creates a `where` clause with given params
 *
 * @param fieldName - The name of the field
 * @param path - Path to the field reference
 * @param value - Field's value
 * @param op - Query operator
 * @param target - Target object to assign the result to. The object will be *mutated*
 */
function createWhereClause(
  path: Array<string | number>,
  value: unknown,
  op?: string,
  target: Record<string, any> = {}
): Record<string, any> {
  dset(target, op == null || op === "eq" ? path : path.concat(op), value)

  return target
}

/**
 * Same as `createWhereClause`, but creates a statement with only `$in` operator and check if the `value` is an array.
 *
 * @param fieldName - The name of the field
 * @param path - Path to the field reference
 * @param value - Field's value
 * @param target - Target object to assign the result to. The object will be *mutated*
 */
function createWhereInClause(
  fieldName: string,
  path: Array<string | number>,
  value: unknown,
  target?: Record<string, any>
) {
  if (!Array.isArray(value)) {
    throw new BetterAuthError(
      prefixErrorMessage(
        `The value for the field "${fieldName}" must be an array when using the $in operator.`
      )
    )
  }

  return createWhereClause(path, value, "$in", target)
}

/**
 * Transfroms hiven list of Where clause(s) for Mikro ORM
 *
 * @param entityName - Entity name
 * @param where - A list where clause(s) to normalize
 */
function normalizeWhereClause(
  orm: MikroORM,
  entityName: string,
  where?: Where[]
) {
  if (!where) {
    return {}
  }

  if (where.length === 1) {
    const [w] = where

    if (!w) {
      return {}
    }

    const path = getFieldPath(orm, entityName, w.field)

    if (w.operator === "in") {
      return createWhereInClause(w.field, path, w.value)
    }

    switch (w.operator) {
      case "contains":
        return createWhereClause(path, `%${w.value}%`, "$like")
      case "starts_with":
        return createWhereClause(path, `${w.value}%`, "$like")
      case "ends_with":
        return createWhereClause(path, `%${w.value}`, "$like")
      // The next 5 case statemets are _expected_ to fall through so we can simplify and reuse the same logic for these operators
      case "gt":
      case "gte":
      case "lt":
      case "lte":
      case "ne":
        return createWhereClause(path, w.value, `$${w.operator}`)
      default:
        return createWhereClause(path, w.value)
    }
  }
  const result: Record<string, any> = {}

  where
    .filter(({connector}) => !connector || connector === "AND")
    .forEach(({field, operator, value}, index) => {
      const path = ["$and", index].concat(getFieldPath(orm, entityName, field))

      if (operator === "in") {
        return createWhereInClause(field, path, value, result)
      }

      return createWhereClause(path, value, "eq", result)
    })

  where
    .filter(({connector}) => connector === "OR")
    .forEach(({field, value}, index) => {
      const path = ["$and", index].concat(getFieldPath(orm, entityName, field))

      return createWhereClause(path, value, "eq", result)
    })

  return result
}

function normalizeInput<T extends Record<string, any>>(
  orm: MikroORM,
  entityName: string,
  input: T
) {
  const fields = {}
  Object.entries(input).forEach(([key, value]) => {
    const path = getFieldPath(orm, entityName, key)
    dset(fields, path, value)
  })

  return fields
}

export function mikroOrmAdapter(orm: MikroORM) {
  const adapter = (_options: BetterAuthOptions): Adapter => ({
    id: "mikro-orm",
    async create({model: entityName, data}) {
      entityName = normalizeEntityName(entityName)

      const input = normalizeInput(orm, entityName, data)
      const entity = orm.em.create(entityName, input)

      await orm.em.persistAndFlush(entity)

      return normalizeOutput(orm, entityName, entity) as any
    },
    async findOne({model: entityName, where}) {
      entityName = normalizeEntityName(entityName)

      const entity = await orm.em.findOne(
        entityName,
        normalizeWhereClause(orm, entityName, where)
      )

      return (entity ? normalizeOutput(orm, entityName, entity) : null) as any
    },
    async findMany({model: entityName, where, limit, offset, sortBy}) {
      entityName = normalizeEntityName(entityName)

      const options: FindOptions<any> = {
        limit,
        offset
      }

      if (sortBy) {
        const path = getFieldPath(orm, entityName, sortBy.field)
        dset(options, ["orderBy", ...path], sortBy.direction)
      }

      const rows = await orm.em.find(
        entityName,
        normalizeWhereClause(orm, entityName, where),
        options
      )

      return rows.map(row => normalizeOutput(orm, entityName, row)) as any
    },
    async update({model: entityName, where, update}) {
      entityName = normalizeEntityName(entityName)

      const entity = await orm.em.findOne(
        entityName,
        normalizeWhereClause(orm, entityName, where)
      )

      if (!entity) {
        return null
      }

      orm.em.assign(entity, normalizeInput(orm, entityName, update))
      await orm.em.flush()

      return normalizeOutput(orm, entityName, entity) as any
    },
    async updateMany({model: entityName, where, update}) {
      entityName = normalizeEntityName(entityName)

      const affected = await orm.em.nativeUpdate(
        entityName,
        normalizeWhereClause(orm, entityName, where),
        normalizeInput(orm, entityName, update)
      )

      orm.em.clear()

      return affected
    },
    async delete({model: entityName, where}) {
      entityName = normalizeEntityName(entityName)

      const entity = await orm.em.findOne(
        entityName,
        normalizeWhereClause(orm, entityName, where)
      )

      if (entity) {
        await orm.em.removeAndFlush(entity)
      }
    },
    async deleteMany({model: entityName, where}) {
      entityName = normalizeEntityName(entityName)

      const affected = await orm.em.nativeDelete(
        entityName,
        normalizeWhereClause(orm, entityName, where)
      )

      orm.em.clear() // This clears the IdentityMap

      return affected
    }
  })

  return adapter
}
