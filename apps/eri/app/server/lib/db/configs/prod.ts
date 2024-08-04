import {parse} from "node:path"

import type {MigrationObject} from "@mikro-orm/core"

import promise from "./dev.js"

type MigrationsModules = Record<
  string,
  Record<string, MigrationObject["class"]>
>

const modules = import.meta.glob("../../../db/migrations/*.ts", {
  eager: true
}) as MigrationsModules

const migrationsList = Object.entries(modules).map<MigrationObject>(
  ([path, mod]) => {
    const {name} = parse(path)

    return {name, class: mod[name]}
  }
)

export default promise.then(
  config => ({...config, migrations: {migrationsList}}) satisfies typeof config
)
