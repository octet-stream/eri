import {join, dirname} from "node:path"

import {defineConfig} from "@mikro-orm/mysql"
import {Migrator} from "@mikro-orm/migrations"

import * as entities from "../../../db/entities.js"
import * as subscribers from "../../../db/subscribers.js"

import appConfig from "../../config.js"

const {orm} = appConfig

const base = join(dirname(dirname(import.meta.dirname)), "db")

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
