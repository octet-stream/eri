import {initTRPC} from "@trpc/server"

import superjson from "superjson"

import {GlobalContext} from "server/trpc/context"

import ormContext from "server/trpc/middleware/ormContext"

export const trpc = initTRPC.context<GlobalContext>().create({
  transformer: superjson
})

export const {middleware, mergeRouters, router} = trpc

/**
 * Base procedure builder, with MikroORM context middleware
 */
export const procedure = trpc.procedure.use(ormContext)
