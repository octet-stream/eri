import {RequestContext} from "@mikro-orm/mariadb"
import type {MikroORM} from "@mikro-orm/mariadb"
import {createMiddleware} from "hono/factory"

import {orm} from "../lib/db/orm.js"

declare module "react-router" {
  interface AppLoadContext {
    /**
     * Mikro ORM instance
     */
    readonly orm: MikroORM
  }
}

export const withOrm = () =>
  createMiddleware(async (ctx, next) => {
    ctx.set("orm", orm)

    return RequestContext.create(orm.em, () => next())
  })
