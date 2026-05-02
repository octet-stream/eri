import type {MikroORM} from "@mikro-orm/mariadb"
import {afterAll, beforeAll, beforeEach, test} from "vitest"

import {orm} from "../../app/server/lib/db/orm.ts"

export interface OrmTestContext {
  orm: MikroORM
}

beforeAll(async () => {
  orm.config.set("allowGlobalContext", true)
  await orm.schema.ensureDatabase()
  await orm.connect()
})

afterAll(async () => {
  await orm.schema.dropDatabase()
  await orm.close()
})

beforeEach(async () => {
  await orm.schema.drop({dropForeignKeys: true, dropMigrationsTable: true})
  await orm.schema.create()
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
