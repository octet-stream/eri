import type {Options} from "@mikro-orm/mysql"
import {customAlphabet} from "nanoid/async"
import {urlAlphabet} from "nanoid"

import mysql from "mysql2/promise"

import {createORM} from "server/lib/db/orm"
import {getConfig} from "server/lib/db/config"

const alphanum = urlAlphabet.replace(/[^a-z0-9]/gi, "")
const createDatabaseNameSuffix = customAlphabet(alphanum, 21)

const getTestConfig = async (): Promise<Options> => {
  // TODO: Share config using test context
  const config = await getConfig()

  config.dbName = `${config.dbName}__test__${await createDatabaseNameSuffix()}`

  // @ts-expect-error Override db name so we can pass it to getORM in tests
  process.env.MIKRO_ORM_DB_NAME = config.dbName

  return config
}

/**
 * Creates a new MySQL connection using mysql2 driver.
 *
 * **Important**: this function requires a user with database management access.
 * You'll probably gonna need to create a user that can manage databases with names starting with eri-test__ name
 */
const createNativeConnection = (options: Options) => mysql.createConnection({
  port: options.port,
  user: options.user
})

export const setup = async () => {
  const config = await getTestConfig()
  const connection = await createNativeConnection(config)

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.dbName}\``)
  await connection.end()

  const orm = await createORM(config)

  const generator = orm.getSchemaGenerator()

  await generator.createSchema()
  await orm.close()
}

export const cleanup = async () => {
  const config = await getConfig()
  const orm = await createORM(config)
  const generator = orm.getSchemaGenerator()

  if (await orm.isConnected()) {
    await generator.dropDatabase(orm.config.get("dbName"))
    await orm.close()
  }
}
