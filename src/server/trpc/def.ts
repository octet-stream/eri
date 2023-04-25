import {initTRPC} from "@trpc/server"

import SuperJSON from "superjson"

import {GlobalContext} from "server/trpc/context"

export const trpc = initTRPC.context<GlobalContext>().create({
  transformer: SuperJSON
})

export const {middleware, mergeRouters, router, procedure} = trpc
