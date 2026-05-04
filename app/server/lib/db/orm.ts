import {mkdir} from "node:fs/promises"
import {MikroORM} from "@mikro-orm/libsql"

import type {Simplify} from "#app/lib/types/Simplify.ts"
import config from "#app/server/lib/config.ts"
import {createLibsqlConfig} from "#app/server/lib/db/configs/libsql.ts"

export type EntityShape<
  T extends {[x: PropertyKey]: any},
  O extends PropertyKey = never
> = Simplify<Omit<Record<keyof T | (string & {}), any>, O>>

if (!config.orm.connection.isRemote) {
  await mkdir(config.orm.connection.dbName, {recursive: true})
}

export const ormConfig = createLibsqlConfig()

export const orm = new MikroORM(ormConfig)
