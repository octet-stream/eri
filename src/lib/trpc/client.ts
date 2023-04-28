import {httpBatchLink, createTRPCProxyClient} from "@trpc/client"

import SuperJSON from "superjson"

import {serverAddress} from "lib/util/serverAddress"

import type {Router} from "server/trpc/router"

export const client = createTRPCProxyClient<Router>({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: new URL("/api/trpc", serverAddress).href
    })
  ]
})
