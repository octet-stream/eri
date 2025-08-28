import {createMiddleware} from "hono/factory"

import {auth} from "../../lib/auth/auth.ts"

export const withAuth = () =>
  createMiddleware(async (ctx, next) => {
    ctx.set("auth", auth)

    await next()
  })
