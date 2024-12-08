import type {MikroORM} from "@mikro-orm/core"
import {afterAll, beforeAll, beforeEach, test} from "vitest"

import {orm} from "../../../app/server/lib/db/orm.js"

export interface OrmTestContext {
  orm: MikroORM
}

beforeAll(async () => {
  // @ts-expect-error This is allowed so we can set unique name for test database
  process.env.DB_NAME = `eri_test_${crypto.randomUUID()}`

  orm.config.set("dbName", process.env.DB_NAME)
  orm.config.set("allowGlobalContext", true)
  await orm.connect()
})

afterAll(async () => {
  await orm.getSchemaGenerator().dropDatabase()
  await orm.close()
})

beforeEach<OrmTestContext>(async ({orm}) => {
  await orm.getSchemaGenerator().refreshDatabase()
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
