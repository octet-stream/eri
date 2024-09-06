import {join} from "node:path"

import {defineConfig} from "@mikro-orm/mariadb"
import {Migrator} from "@mikro-orm/migrations"

import * as entities from "../../../db/entities.js"
import * as subscribers from "../../../db/subscribers.js"

import appConfig from "../../config.js"

const {orm} = appConfig

const base = join(process.cwd(), "app", "server", "db")

const config = defineConfig({
  ...orm,

  ensureDatabase: true,
  entities: Object.values(entities),
  subscribers: Object.values(subscribers).map(Subscriber => new Subscriber()),
  extensions: [Migrator],
  migrations: {
    path: join(base, "migrations")
  }
})

export default config
