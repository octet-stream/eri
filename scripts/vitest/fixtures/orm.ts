import {RequestContext} from "@mikro-orm/mariadb"
import type {MikroORM} from "@mikro-orm/mariadb"
import {test, beforeAll} from "vitest"

beforeAll(async () => {
  // @ts-expect-error This is allowed so we can set unique name for test database
  process.env.DB_NAME = `eri_test_${crypto.randomUUID()}`
})

export interface OrmTestContext {
  orm: MikroORM
}

export const ormTest = test.extend<OrmTestContext>({
  orm: [
    async ({task: _}, use) => {
      // Importing Mikro ORM like this so it will use our config
      const {createOrm} = await import("../../../app/server/lib/db/orm.js")

      const orm = await createOrm()
      const gen = orm.getSchemaGenerator()

      await gen.refreshDatabase()
      await RequestContext.create(orm.em, () => use(orm))
    },

    {
      auto: true
    }
  ]
})
