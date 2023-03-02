import {resolve, join} from "node:path"

import {defineConfig} from "@mikro-orm/mysql"

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

const isTestEnv = process.env.NODE_ENV === "test"

export const getConfig = () => defineConfig({
  connect: !isTestEnv,
  implicitTransactions: true,
  dbName: process.env.MIKRO_ORM_DB_NAME || undefined,
  host: process.env.MIKRO_ORM_HOST || undefined,
  port: parseInt(process.env.MIKRO_ORM_PORT || "", 10) || undefined,
  debug: process.env.NODE_ENV === "development",
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
