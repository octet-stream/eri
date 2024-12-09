import type {EntityProperty, FindOptions, MikroORM} from "@mikro-orm/core"
import type {Adapter, BetterAuthOptions, Where} from "better-auth"
import {serialize, ReferenceKind} from "@mikro-orm/core"
import {pascalCase, camelCase} from "scule"
import {BetterAuthError} from "better-auth"
import {dset} from "dset"

const normalizeEntityName = (name: string) => pascalCase(name)

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

function transformOutput(
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

function getFieldPath(orm: MikroORM, entityName: string, fieldName: string) {
  const metadata = getEntityMetadata(orm, entityName)

  const fieldMetadata = metadata.props.find(prop => {
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
        prefixErrorMessage("Complex primary keys are not supported")
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
 * Transfroms hiven list of Where clause(s) for Mikro ORM
 *
 * @param entityName - Entity name
 * @param where - A list where clause(s) to normalize
 *
 * @internal
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
      if (!Array.isArray(w.value)) {
        throw new BetterAuthError(
          prefixErrorMessage(
            `The value for the field "${w.field}" must be an array when using the ${w.operator} operator.`
          )
        )
      }

      const result = {}

      dset(result, path.concat("$in"), w.value)

      return result
    }

    if (w.operator === "contains") {
      const result = {}

      dset(result, path.concat("$like"), `%${w.value}%`)

      return result
    }

    if (w.operator === "starts_with") {
      const result = {}

      dset(result, path.concat("$like"), `${w.value}%`)

      return result
    }

    if (w.operator === "ends_with") {
      const result = {}

      dset(result, path.concat("$like"), `%${w.value}`)

      return result
    }

    if (w.operator === "gt") {
      const result = {}

      dset(result, path.concat("$gt"), w.value)

      return result
    }

    const result = {}

    dset(result, path, w.value)

    return result
  }

  return {}
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

      return transformOutput(orm, entityName, entity) as any
    },
    async findOne({model: entityName, where}) {
      entityName = normalizeEntityName(entityName)

      const entity = await orm.em.findOne(
        entityName,
        normalizeWhereClause(orm, entityName, where)
      )

      return (entity ? transformOutput(orm, entityName, entity) : null) as any
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

      return rows.map(row => transformOutput(orm, entityName, row)) as any
    },
    async update({model: entityName, where, update}) {
      entityName = normalizeEntityName(entityName)

      const entity = await orm.em.findOne(
        entityName,
        normalizeWhereClause(orm, entityName, where)
      )

      // ! Not so sure if I should throw an error or just return null.
      if (!entity) {
        return null
      }

      orm.em.assign(entity, normalizeInput(orm, entityName, update))
      await orm.em.flush()

      return transformOutput(orm, entityName, entity) as any
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

      orm.em.clear() // Clear IdentityMap

      return affected
    }
  })

  return adapter
}
