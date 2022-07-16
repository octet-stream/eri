import "reflect-metadata"

import {MikroORM} from "@mikro-orm/core"
import type {Options, EntityManager} from "@mikro-orm/core"

import {
  User,
  Post,
  InvitationCode
} from "server/db/entity"

import {
  UserSubscriber
} from "server/db/subscriber"

interface RunIsolatedCallback<T> {
  (em: EntityManager): T
}

let orm: MikroORM | null = null

/**
 * Returns config for MikroORM with parameters taken from .env.* files.
 *
 * Note to read and inject these parameters onto `process.env` when running outside Next.js
 */
export const getConfig = (): Options => ({
  type: "mysql",
  implicitTransactions: true,
  entities: [
    User,
    Post,
    InvitationCode
  ],
  subscribers: [
    new UserSubscriber()
  ],
  dbName: process.env.MIKRO_ORM_DB_NAME || undefined,
  host: process.env.MIKRO_ORM_HOST || undefined,
  port: parseInt(process.env.MIKRO_ORM_PORT || "", 10) || undefined,
  debug: process.env.NODE_ENV === "development"
})

/**
 * Returns MikroORM instance.
 * Creates the new if one does not exists, then caches it.
 */
export async function getORM() {
  if (orm) {
    return orm
  }

  orm = await MikroORM.init(getConfig())

  return orm
}

export async function forkEntityManager(): Promise<EntityManager> {
  const orm = await getORM()

  return orm.em.fork()
}

export async function runIsolatied<T>(fn: RunIsolatedCallback<T>): Promise<T> {
  const em = await forkEntityManager()

  try {
    const result = await fn(em)

    return result
  } finally {
    em.clear()
  }
}