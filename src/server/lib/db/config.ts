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

const ConnectionConfig = z.object({
  dbName: z.string().regex(/^[a-z0-9-_]+$/i),
  host: z.string().optional(),
  port: z.union([ConnectionPortString, z.number()]).optional(),
  debug: z.union([
    z.literal("development"),
    z.literal("production"),
    z.literal("test")
  ]).transform(env => env === "development")
})

export const getConfig = async () => {
  const {host, port, dbName, debug} = await ConnectionConfig.parseAsync({
    dbName: process.env.MIKRO_ORM_DB_NAME,
    host: process.env.MIKRO_ORM_HOST,
    port: process.env.MIKRO_ORM_PORT,
    debug: process.env.NODE_ENV
  })

  return defineConfig({
    dbName,
    host,
    port,
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
