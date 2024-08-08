import {RequestContext} from "@mikro-orm/mysql"
import {createMiddleware} from "hono/factory"
import type {MikroORM} from "@mikro-orm/mysql"

import {getOrm} from "../lib/db/orm.js"

declare module "@remix-run/node" {
  interface AppLoadContext {
    /**
     * Mikro ORM instance
     */
    readonly orm: MikroORM
  }
}

export const withOrm = () =>
  createMiddleware(async (ctx, next) => {
    const orm = await getOrm()

    ctx.set("orm", orm)

    return RequestContext.create(orm.em, () => next())
  })
