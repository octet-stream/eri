import {parse} from "node:path"

import type {Constructor, MigrationObject} from "@mikro-orm/mariadb"
import type {Migration} from "@mikro-orm/migrations"

type MigrationsModules = Record<string, Record<string, Constructor<Migration>>>

const modules = import.meta.glob("../../../db/migrations/*.ts", {
  eager: true
}) as MigrationsModules

const migrations = Object.entries(modules).map<MigrationObject>(
  ([path, mod]) => {
    const {name} = parse(path)

    return {name, class: mod[name]}
  }
)

export default import("#app/server/lib/db/configs/libsql.ts").then(
  ({createLibsqlConfig}) => createLibsqlConfig({migrations})
)
