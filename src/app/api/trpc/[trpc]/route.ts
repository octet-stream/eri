import {fetchRequestHandler} from "@trpc/server/adapters/fetch"

import {createContext} from "server/trpc/context"
import {router} from "server/trpc/router"

const handler = (req: Request) => fetchRequestHandler({
  endpoint: "/api/trpc",
  createContext,
  router,
  req
})

export const GET = handler

export const POST = handler
