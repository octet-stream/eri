import {MikroORM, RequestContext} from "@mikro-orm/mariadb"

import config from "./configs/base.js"

let cache: Promise<MikroORM> | undefined

export const createOrm = () => MikroORM.init(config)

export function getOrm(): Promise<MikroORM> {
  if (!cache) {
    cache = createOrm()
  }

  return cache
}

export type WithOrmCallback<TResult, TArgs extends unknown[]> = (
  orm: MikroORM,

  ...args: TArgs
) => Promise<TResult>

export const withOrm =
  <TResult, TArgs extends unknown[]>(fn: WithOrmCallback<TResult, TArgs>) =>
  async (...args: TArgs) => {
    const orm = await getOrm()

    return RequestContext.create(orm.em, () => fn(orm, ...args))
  }
