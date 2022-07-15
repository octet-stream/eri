import {router as r} from "@trpc/server"

import type {Context} from "server/trpc/context"

import query from "./query"
import mutation from "./mutation"

export const router = r<Context>()
  .merge(query)
  .merge(mutation)

export type Router = typeof router
