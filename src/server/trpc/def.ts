import {initTRPC} from "@trpc/server"

import superjson from "superjson"

import {GlobalContext} from "server/trpc/context"

export const trpc = initTRPC.context<GlobalContext>().create({
  transformer: superjson
})

export const {middleware, mergeRouters, router, procedure} = trpc
