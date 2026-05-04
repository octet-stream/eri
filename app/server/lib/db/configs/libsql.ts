import {resolve} from "node:path"

import type {Constructor, MigrationObject} from "@mikro-orm/core"
import {defineConfig} from "@mikro-orm/libsql"
import {type Migration, Migrator} from "@mikro-orm/migrations"

import * as entities from "#app/server/db/entities.ts"
import * as subscribers from "#app/server/db/subscribers.ts"

import config from "#app/server/lib/config.ts"

const {connection} = config.orm

export interface CreateLibsqlConfigParams<
  TMigration extends MigrationObject | Constructor<Migration>
> {
  migrations?: TMigration[]
}

export const createLibsqlConfig = <
  const TMigration extends MigrationObject | Constructor<Migration>
>(
  params: CreateLibsqlConfigParams<TMigration> = {}
) =>
  defineConfig({
    dbName: connection.dbName,
    password: connection.password,
    extensions: [Migrator],
    entities: Object.values(entities),
    subscribers: Object.values(subscribers).map(Subscriber => new Subscriber()),
    migrations: {
      path: resolve("app", "server", "db", "migrations"),
      migrationsList: params.migrations
    }
  })
