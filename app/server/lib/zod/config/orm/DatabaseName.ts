import {z} from "zod"

const pattern = /^[a-z0-9-_]+$/i

const message = `Invalid database name. The value must correspond following pattern: ${pattern.source}`

export const DatabaseName = z.string().regex(pattern, message)

export type IDatabaseName = z.input<typeof DatabaseName>

export type ODatabaseName = z.output<typeof DatabaseName>
