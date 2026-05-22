import {RequestContext} from "@mikro-orm/core"
import type {MikroORM} from "@mikro-orm/libsql"
import {createMiddleware} from "hono/factory"

export const withOrm = (orm: MikroORM) =>
  createMiddleware(async (ctx, next) => {
    ctx.set("orm", orm)

    return RequestContext.create(orm.em, () => next())
  })
