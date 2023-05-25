import type {
  FetchCreateContextFn,
  FetchCreateContextFnOptions
} from "@trpc/server/adapters/fetch"
import {NextRequest} from "next/server"

import type {Simplify} from "lib/type/Simplify"
import type {Replace} from "lib/type/Replace"

import type {Router} from "./router"

export interface Context { }

export type FetchContext =
  Simplify<Context & Replace<FetchCreateContextFnOptions, {
    req: NextRequest
  }>>

export const TRPC_CALLER_CONTEXT_KEY = "__$$TRPC_CALLER_CONTEXT_KEY$$__"

export interface TRPCCallerContext {
  [TRPC_CALLER_CONTEXT_KEY]: true
}

export type GlobalContext =
  | Context
  | FetchContext

/**
 * Checks whether current context has `req` and `resHeaders` fields.
 * This indicated that procedure is being called within HTTP request context
 */
export const isFetchContext = (
  ctx: GlobalContext
): ctx is FetchContext => !!("req" in ctx && "resHeaders" in ctx)

/**
 * Checks whether `TRPC_CALLER_CONTEXT_KEY` key is present.
 * This indicates that procedure being called using `createCaller` (the one exposed from `lib/trpc/server.ts` module)
 */
export const isTRPCCallerContext = (
  ctx: GlobalContext
): ctx is TRPCCallerContext => TRPC_CALLER_CONTEXT_KEY in ctx

/**
 * Creates context for procedue call
 */
export const createContext: FetchCreateContextFn<Router> = (
  ctx
): GlobalContext => isFetchContext(ctx) ? ctx : {}
