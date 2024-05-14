import {initTRPC} from "@trpc/server"

import type {Context} from "./context.js"

export const trpc = initTRPC.context<Context>().create()

export const {
  middleware,
  procedure,
  router,
  mergeRouters,
  createCallerFactory
} = trpc
