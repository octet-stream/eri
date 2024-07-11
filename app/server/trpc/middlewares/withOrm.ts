import {RequestContext, MikroORM} from "@mikro-orm/mysql"

import type {Context} from "../context.js"
import {getOrm} from "../../lib/db/orm.js"
import {middleware} from "../trpc.js"

interface WithOrm {
  orm: MikroORM
}

interface LooseOrmContext extends Context, Partial<WithOrm> {}

export interface OrmContext extends Context, WithOrm {}

/**
 * Checks if given `ctx` has orm context already installed
 *
 * @param ctx - A context to test
 */
const hasOrmContext = (ctx: LooseOrmContext): ctx is OrmContext =>
  ctx.orm instanceof MikroORM

export const withOrm = middleware(async ({ctx, next}) => {
  // Do nothing if we already have an ORM set up in the middlewares chain
  if (hasOrmContext(ctx)) {
    return next({ctx})
  }

  const orm = await getOrm()

  return RequestContext.create(
    orm.em,

    () => next({ctx: {...ctx, orm} satisfies OrmContext})
  )
})
