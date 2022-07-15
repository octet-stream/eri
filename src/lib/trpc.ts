import {createReactQueryHooks} from "@trpc/react"

import type {Router} from "server/trpc/route"

const {Provider, createClient, ...trpc} = createReactQueryHooks<Router>()

export const client = createClient({
  url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`
})

export const trpcClient = client
export const TRPCProvider = Provider
export const hooks = trpc

export const {useQuery, useMutation} = trpc
