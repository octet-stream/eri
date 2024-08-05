import {RequestContext} from "@mikro-orm/mysql"
import {createMiddleware} from "hono/factory"

import {getOrm} from "../lib/db/orm.js"

export const withOrm = () =>
  createMiddleware(async (_, next) => {
    const orm = await getOrm()

    return RequestContext.create(orm.em, () => next())
  })
