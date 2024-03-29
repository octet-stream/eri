import {join, dirname} from "node:path"

import {defineConfig} from "@mikro-orm/mysql"

const base = join(dirname(dirname(import.meta.dirname)), "db")

export const config = defineConfig({
  dbName: process.env.MIKRO_ORM_DB_NAME,
  host: process.env.MIKRO_ORM_HOST,
  port: parseInt(process.env.MIKRO_ORM_PORT || "3306", 10),
  user: process.env.MIKRO_ORM_USER,
  password: process.env.MIKRO_ORM_PASSWORD,
  migrations: {
    path: join(base, "migrations")
  },
  seeder: {
    path: join(base, "seeder")
  }
})
