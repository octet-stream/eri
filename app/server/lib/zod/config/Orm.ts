import {z} from "zod"
import {DatabaseHost} from "./orm/DatabaseHost.ts"
import {DatabaseName} from "./orm/DatabaseName.ts"
import {DatabasePort} from "./orm/DatabasePort.ts"
import {DatabaseUserName} from "./orm/DatabaseUserName.ts"
import {DatabaseUserPassword} from "./orm/DatabaseUserPassword.ts"
import {Debug} from "./orm/Debug.ts"

export const Orm = z
  .object({
    debug: Debug,
    host: DatabaseHost,
    port: DatabasePort,
    dbName: DatabaseName,
    user: DatabaseUserName,
    password: DatabaseUserPassword
  })
  .transform(value => Object.freeze(value))

export type IOrm = z.input<typeof Orm>

export type OOrm = z.output<typeof Orm>
