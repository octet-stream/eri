import {MikroORM, RequestContext} from "@mikro-orm/mysql"

import {config} from "./config.js"

export const orm = await MikroORM.init(config)

export type WithOrmCallback<TResult, TArgs extends unknown[]> = (
  // eslint-disable-next-line no-shadow
  orm: MikroORM,

  ...args: TArgs
) => Promise<TResult>

export const withOrm = <TResult, TArgs extends unknown[]>(
  fn: WithOrmCallback<TResult, TArgs>
) => async (...args: TArgs) => RequestContext.create(
  orm.em,

  () => fn(orm, ...args)
)
