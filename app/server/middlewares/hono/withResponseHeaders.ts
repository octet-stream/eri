import {createMiddleware} from "hono/factory"

import type {Env} from "../../../server.ts"

export const withResponseHeaders = () =>
  createMiddleware<Env>(async (ctx, next) => {
    const headers = new Headers()

    ctx.set("resHeaders", headers)
    try {
      await next()
    } finally {
      headers.forEach((value, name) => {
        if (!ctx.res.headers.get(name) || ctx.res.headers.has("set-cookie")) {
          ctx.res.headers.set(name, value)
        }
      })
    }
  })
