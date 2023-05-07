import type {
  FetchCreateContextFn,
  FetchCreateContextFnOptions
} from "@trpc/server/adapters/fetch"
import {NextRequest} from "next/server"

import type {Simplify} from "lib/type/Simplify"
import type {Replace} from "lib/type/Replace"

import {User} from "server/db/entity/User"

import type {Router} from "./router"

export interface Context { }

export type FetchContext =
  Simplify<Context & Replace<FetchCreateContextFnOptions, {
    req: NextRequest
  }>>

export type AuthContext = Context & {
  user: User
}

export const TRPC_CALLER_CONTEXT_KEY = "__$$TRPC_CALLER_CONTEXT_KEY$$__"

export interface TRPCCallerContext {
  [TRPC_CALLER_CONTEXT_KEY]: true
}

export type GlobalContext =
  | Context
  | FetchContext
  | AuthContext
  | TRPCCallerContext

export const isFetchContext = (
  ctx: GlobalContext
): ctx is FetchContext => !!("req" in ctx && "resHeaders" in ctx)

export const isTRPCCallerContext = (
  ctx: GlobalContext
): ctx is TRPCCallerContext => TRPC_CALLER_CONTEXT_KEY in ctx

export const createContext: FetchCreateContextFn<Router> = (
  ctx
): GlobalContext => isFetchContext(ctx) ? ctx : {}
