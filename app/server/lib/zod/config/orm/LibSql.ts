import {resolve} from "node:path"
import {fileURLToPath} from "node:url"

import {z} from "zod"

const LibSqlUrl = z.url({protocol: /^libsql$/})

const LibSqlFileUrl = z
  .url({protocol: /^file$/})
  .transform(value => fileURLToPath(value))

const FILE_PATH_EXPR =
  /^(\/(?:[^/ ]+\/)*[^/ ]*$|^\.(?:\/[^/ ]+)+\/?$|^\.\.\/(?:[^/ ]+\/)*[^/ ]*|[a-zA-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*)$/

const LibSqlDbPath = z
  .string()
  .regex(FILE_PATH_EXPR)
  .endsWith(".db")
  .transform(value => resolve(value))

const LibSqlDbName = z
  .union([LibSqlUrl, LibSqlFileUrl, LibSqlDbPath])
  .default(".databases/eri.db")

const LibSqlPassword = z.string().trim().min(8)

export const LibSql = z
  .object({
    /**
     * Path to local SQLite database file, or remote server address with `libsql://` protocol
     */
    dbName: LibSqlDbName,

    /**
     * Password for authentication at remote server.
     *
     * **You don't need it for local database**
     */
    password: LibSqlPassword.optional()
  })
  .transform(value =>
    Object.freeze({...value, isRemote: !FILE_PATH_EXPR.test(value.dbName)})
  )

export type ILibSql = z.input<typeof LibSql>

export type OLibSql = z.output<typeof LibSql>
