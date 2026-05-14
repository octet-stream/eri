import {createMiddleware} from "hono/factory"

import type {Auth} from "../../lib/auth/auth.ts"

export const withAuth = (auth: Auth) =>
  createMiddleware(async (ctx, next) => {
    ctx.set("auth", auth)

    await next()
  })
