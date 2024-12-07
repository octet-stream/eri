import type {EntityMetadata, FindOptions, MikroORM} from "@mikro-orm/core"
import type {Adapter, BetterAuthOptions, Where} from "better-auth"
import {serialize} from "@mikro-orm/mariadb"
import {BetterAuthError} from "better-auth"
import {pascalCase, camelCase} from "scule"
import {select} from "@udecode/plate-common"

const normalizeEntityName = (name: string) => pascalCase(name)

const prefixErrorMessage = (message: string) => `Mikro ORM Adapter: ${message}`

function getEntityMetadata(orm: MikroORM, entityName: string) {
  const storage = orm.getMetadata()

  if (!storage.has(entityName)) {
    throw new BetterAuthError(
      prefixErrorMessage(
        `Mikro ORM Adapter: Cannot find metadata for ${entityName} entity. Make sure it defined and listed in your Mikro ORM config.`
      )
    )
  }

  return storage.get(entityName)
}

function mapRelationsFields(
  orm: MikroORM,
  metadata: EntityMetadata,
  input: Record<string, any>
) {
  if (metadata.relations.length === 0) {
    return []
  }

  const relations = metadata.relations.map(rel => {
    if (rel.ownColumns.length > 1) {
      throw new BetterAuthError(
        prefixErrorMessage(
          "Composite PKs resolution is not supported at this moment."
        )
      )
    }

    return {
      name: rel.name,
      fk: camelCase(rel.ownColumns[0]),
      entity: rel.entity()
    }
  })

  const fields = Object.fromEntries(
    Object.entries(input).filter(([key]) =>
      relations.some(({fk}) => fk === key)
    )
  )

  return Object.fromEntries(
    relations.map(({name, entity, fk}) => [
      name,
      orm.em.getReference(entity, fields[fk])
    ])
  )
}

function transformInput(
  orm: MikroORM,
  entityName: string,
  input: Record<string, any>
) {
  const metadata = getEntityMetadata(orm, entityName)
  const relationsFields = mapRelationsFields(orm, metadata, input)

  return {...input, ...relationsFields}
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

function normalizeWhereClause(where?: Where[]) {
  if (!where) {
    return {}
  }

  if (where.length) {
    const [w] = where

    if (!w) {
      return {}
    }

    const {field, value} = w

    return {[field]: value}
  }

  return {}
}

export function mikroOrmAdapter(orm: MikroORM) {
  const adapter = (_options: BetterAuthOptions): Adapter => ({
    id: "mikro-orm",
    async create({model: entityName, data}) {
      entityName = normalizeEntityName(entityName)

      const input = transformInput(orm, entityName, data)
      const entity = orm.em.create(entityName, input)

      await orm.em.persistAndFlush(entity)

      orm.em.clear()

      return transformOutput(orm, entityName, entity) as any
    },
    async findOne({model: entityName, where}) {
      entityName = normalizeEntityName(entityName)

      const entity = await orm.em.findOne(
        entityName,
        normalizeWhereClause(where)
      )

      return (entity ? serialize(entity) : null) as any
    },
    async findMany({model: entityName, where, limit, offset, sortBy}) {
      // console.log({entityName, where, limit, offset, select, sortBy})
      entityName = normalizeEntityName(entityName)

      const options: FindOptions<any> = {
        limit,
        offset
      }

      // if (sortBy) {
      // }

      const entities = await orm.em.find(
        entityName,
        normalizeWhereClause(where),
        options
      )

      return entities as any
    },
    async update({model, where, update}) {
      return null
    },
    async updateMany({model, where, update}) {
      return 0
    },
    async delete({model, where}) {},
    async deleteMany({model, where}) {
      return 0
    }
  })

  return adapter
}
