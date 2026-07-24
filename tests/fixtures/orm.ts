import {tmpdir} from "node:os"
import {join} from "node:path"
import {nanoid} from "nanoid"
import {v7} from "uuid"
import {createLibsqlConfig} from "#app/server/lib/db/configs/libsql.ts"
import {createOrm, type MikroOrmInstance} from "../../app/server/lib/db/orm.ts"
import {baseTest} from "./base.ts"

export interface OrmTestContext {
  orm: MikroOrmInstance
}

export const ormTest = baseTest
  .extend("ormConfig", {scope: "file"}, ({config}) => {
    const dbName = join(
      tmpdir(),
      "eri-test-databases",
      `${v7()}~${nanoid()}.db`
    )

    const ormConfig = createLibsqlConfig({
      ...config.orm,

      connection: {
        ...config.orm.connection,

        dbName
      }
    })

    return {...ormConfig, allowGlobalContext: true}
  })
  .extend(
    "orm",

    async ({ormConfig}, {onCleanup}) => {
      const orm = await createOrm(ormConfig)

      await orm.schema.create()
      await orm.connect()

      // Wipe out database after each test
      onCleanup(async () => {
        await orm.schema.drop({
          dropForeignKeys: true,
          dropMigrationsTable: true
        })

        await orm.close()
      })

      return orm
    }
  )

export {ormTest as test}
