import {mkdir} from "node:fs/promises"
import {dirname} from "node:path"

import {MikroORM} from "@mikro-orm/libsql"

import type {Simplify} from "#app/lib/types/Simplify.ts"
import config from "#app/server/lib/config.ts"
import type {MikroOrmConfig} from "#app/server/lib/db/configs/libsql.ts"

export type EntityShape<
  T extends {[x: PropertyKey]: any},
  O extends PropertyKey = never
> = Simplify<Omit<Record<keyof T | (string & {}), any>, O>>

// Ensure we have database directory created for non-remote setup, otherwise Mikro ORM fails to connect
if (!config.orm.connection.isRemote) {
  await mkdir(config.orm.connection.dbName, {recursive: true})
}

/**
 * Creates `MikroORM` instance with given config.
 *
 * Use this function when creating context, not in the middlewares to reuse the same instance in different requests
 */
export const createOrm = async (config: MikroOrmConfig) => {
  // Make sure database directory exists
  if (config.dbName && URL.canParse(config.dbName) === false) {
    // dbName should point to a file, so we need to locate it's parent directory
    await mkdir(dirname(config.dbName), {recursive: true})
  }

  return new MikroORM(config)
}

export type MikroOrmInstance = Awaited<ReturnType<typeof createOrm>>
