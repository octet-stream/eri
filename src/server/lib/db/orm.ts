/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

import "reflect-metadata"

import type {EntityManager} from "@mikro-orm/mysql"
import {MikroORM} from "@mikro-orm/mysql"

import {getConfig} from "./config"

interface RunIsolatedCallback<T> {
  (em: EntityManager): T
}

type GlobalThis = typeof globalThis

interface GlobalThisWithORM extends GlobalThis {
  __CACHED_ORM__: MikroORM
}

const globalObject = globalThis as GlobalThisWithORM

/**
 * Returns MikroORM instance.
 * Creates the new if one does not exists, then caches it.
 */
export async function getORM() {
  if (!globalObject.__CACHED_ORM__) {
    globalObject.__CACHED_ORM__ = await MikroORM.init(getConfig())
  }

  return globalObject.__CACHED_ORM__
}

export async function forkEntityManager(): Promise<EntityManager> {
  const orm = await getORM()

  return orm.em.fork()
}

/**
 * Runs given callback with forked EntityManager, then destroys it and returns the result of the callback.
 */
export async function runIsolatied<T>(
  fn: RunIsolatedCallback<T>
): Promise<Awaited<T>> {
  const em = await forkEntityManager()

  try {
    const result = await fn(em)

    return result
  } finally {
    em.clear()
  }
}
