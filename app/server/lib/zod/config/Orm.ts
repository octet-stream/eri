import {z} from "zod"

import {Debug} from "./orm/Debug.ts"
import {LibSql} from "./orm/LibSql.ts"

export const Orm = z
  .object({
    /**
     * Whether to enable debug.
     *
     * Note: This parameter takes process.env.NODE_ENV as input.
     */
    debug: Debug,

    /**
     * Database connection parameters (e. g. host, port etc)
     */
    connection: LibSql
  })
  .transform(value => Object.freeze(value))

export type IOrm = z.input<typeof Orm>

export type OOrm = z.output<typeof Orm>
