import {createMiddleware} from "hono/factory"

import {auth} from "../lib/auth/auth.js"

// declare module "react-router" {
//   interface AppLoadContext {
//     /**
//      * Auth context utilities
//      */
//     readonly auth: typeof auth
//   }
// }

export const withAuth = () =>
  createMiddleware(async (ctx, next) => {
    ctx.set("auth", auth)

    await next()
  })
