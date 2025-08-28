import {RequestContext} from "@mikro-orm/mariadb"
import {createMiddleware} from "hono/factory"

import {orm} from "../../lib/db/orm.ts"

export const withOrm = () =>
  createMiddleware(async (ctx, next) => {
    ctx.set("orm", orm)

    return RequestContext.create(orm.em, () => next())
  })
