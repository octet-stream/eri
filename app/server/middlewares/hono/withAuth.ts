import {createMiddleware} from "hono/factory"

import {auth} from "../../lib/auth/auth.js"

export const withAuth = () =>
  createMiddleware(async (ctx, next) => {
    ctx.set("auth", auth)

    await next()
  })
