import {router as r} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import ormContext from "server/trpc/middleware/ormContext"

import query from "./query"
import mutation from "./mutation"

export const router = r<GlobalContext>()
  .middleware(ormContext)
  .merge(query)
  .merge(mutation)

export type Router = typeof router
