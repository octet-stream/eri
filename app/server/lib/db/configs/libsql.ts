import {resolve} from "node:path"

import type {Constructor, MigrationObject} from "@mikro-orm/core"
import {defineConfig} from "@mikro-orm/libsql"
import {type Migration, Migrator} from "@mikro-orm/migrations"

import * as entities from "#app/server/db/entities.ts"
import * as subscribers from "#app/server/db/subscribers.ts"

import type {OOrm} from "#app/server/lib/zod/config/Orm.ts"

export interface CreateLibsqlConfigParams<
  TMigration extends MigrationObject | Constructor<Migration>
> extends OOrm {
  migrations?: TMigration[]
}

export const createLibsqlConfig = <
  const TMigration extends MigrationObject | Constructor<Migration>
>(
  baseConfig: CreateLibsqlConfigParams<TMigration>
) =>
  defineConfig({
    debug: baseConfig.debug,
    dbName: baseConfig.connection.dbName,
    password: baseConfig.connection.password,
    extensions: [Migrator],
    entities: Object.values(entities),
    subscribers: Object.values(subscribers).map(Subscriber => new Subscriber()),
    migrations: {
      path: resolve("app", "server", "db", "migrations"),
      migrationsList: baseConfig.migrations
    }
  })

export type MikroOrmConfig = ReturnType<typeof createLibsqlConfig>
