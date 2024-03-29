import {join, dirname} from "node:path"

import {defineConfig} from "@mikro-orm/mysql"
import {Migrator} from "@mikro-orm/migrations"
import {SeedManager} from "@mikro-orm/seeder"

import * as entities from "../../db/entities.js"

const base = join(dirname(dirname(import.meta.dirname)), "db")

export const config = defineConfig({
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ensureDatabase: true,
  entities: Object.values(entities),
  extensions: [Migrator, SeedManager],
  migrations: {
    path: join(base, "migrations")
  },
  seeder: {
    path: join(base, "seeder")
  }
})
