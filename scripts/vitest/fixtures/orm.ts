import {test, beforeAll, afterAll, beforeEach} from "vitest"
import type {MikroORM} from "@mikro-orm/mariadb"

export interface OrmTestContext {
  orm: MikroORM
}

beforeAll(async () => {
  // @ts-expect-error This is allowed so we can set unique name for test database
  process.env.DB_NAME = `eri_test_${crypto.randomUUID()}`
})

afterAll(async () => {
  const {createOrm} = await import("../../../app/server/lib/db/orm.js")

  const orm = await createOrm()

  orm.config.set("dbName", process.env.DB_NAME)
  await orm.reconnect()
  await orm.getSchemaGenerator().dropDatabase()
})

beforeEach<OrmTestContext>(async ({orm}) => {
  // Make sure we have connected to the right database
  orm.config.set("dbName", process.env.DB_NAME) // TODO: Fix database configuration. Maybe disable env script for tests or something.
  await orm.reconnect()
  await orm.getSchemaGenerator().refreshDatabase()
})

export const ormTest = test.extend<OrmTestContext>({
  orm: [
    async ({task: _}, use) => {
      // Importing Mikro ORM like this so it will use our config
      const {createOrm} = await import("../../../app/server/lib/db/orm.js")

      const orm = await createOrm()

      // FIXME: Find a better way to add context
      orm.config.set("allowGlobalContext", true)

      await use(orm)
    },

    {
      auto: true
    }
  ]
})
