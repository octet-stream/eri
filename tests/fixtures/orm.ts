import type {MikroORM} from "@mikro-orm/mariadb"
import {afterAll, beforeAll, beforeEach, test} from "vitest"

import {orm} from "../../app/server/lib/db/orm.ts"

export interface OrmTestContext {
  orm: MikroORM
}

beforeAll(async () => {
  orm.config.set("allowGlobalContext", true)
  await orm.getSchemaGenerator().ensureDatabase()
  await orm.connect()
})

afterAll(async () => {
  await orm.getSchemaGenerator().dropDatabase()
  await orm.close()
})

beforeEach(async () => {
  const generator = orm.getSchemaGenerator()
  await generator.dropSchema({dropForeignKeys: true, dropMigrationsTable: true})
  await generator.createSchema()
})

export const ormTest = test.extend<OrmTestContext>({
  orm: [
    async ({task: _}, use) => {
      await use(orm)
    },

    {
      auto: true
    }
  ]
})

export {ormTest as test}
