import {resolve, join} from "node:path"

import {defineConfig} from "@mikro-orm/mysql"
import {z, ZodIssueCode} from "zod"

import {
  User,
  Post,
  InvitationCode
} from "server/db/entity"

import {
  UserSubscriber,
  PostSubscriber
} from "server/db/subscriber"

const DB_ROOT = resolve("db")

const ConnectionPassword = z
  .string()
  .nonempty()
  .optional()
  .superRefine((value, ctx): value is string => {
    if (process.env.NODE_ENV !== "test" && value == null) {
      ctx.addIssue({
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        message: "Password is required for connection user"
      })
    }

    return z.NEVER
  })

const ConnectionPortString = z.string().optional()
  .superRefine((value, ctx) => {
    if (value && /^[0-9]+$/.test(value) === false) {
      ctx.addIssue({
        code: ZodIssueCode.invalid_string,
        validation: "regex"
      })
    }
  })
  .transform(port => port ? parseInt(port, 10) : undefined)

const ConnectionPort = z.union([ConnectionPortString, z.number()]).optional()

const ConnectionConfig = z.object({
  dbName: z.string().nonempty().regex(/^[a-z0-9-_]+$/i),
  user: z.string().nonempty(),
  password: ConnectionPassword,
  host: z.string().nonempty().optional(),
  port: ConnectionPort,
  debug: z.union([
    z.literal("development"),
    z.literal("production"),
    z.literal("test")
  ]).transform(env => env === "development")
})

export const getConfig = async () => {
  const {
    host,
    port,
    user,
    password,
    dbName,
    debug
  } = await ConnectionConfig.parseAsync({
    dbName: process.env.MIKRO_ORM_DB_NAME,
    host: process.env.MIKRO_ORM_HOST,
    port: process.env.MIKRO_ORM_PORT,
    user: process.env.MIKRO_ORM_USER,
    password: process.env.MIKRO_ORM_PASSWORD,
    debug: process.env.NODE_ENV
  } as z.input<typeof ConnectionConfig>)

  return defineConfig({
    dbName,
    host,
    port,
    user,
    password,
    debug,

    implicitTransactions: true,
    migrations: {
      path: join(DB_ROOT, "migration")
    },
    seeder: {
      path: join(DB_ROOT, "seed")
    },
    entities: [User, Post, InvitationCode],
    subscribers: [
      UserSubscriber,
      PostSubscriber
    ].map(Subscriber => new Subscriber())
  })
}
