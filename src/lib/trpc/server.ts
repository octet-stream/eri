import {notFound} from "next/navigation"
import {TRPCError} from "@trpc/server"

import {TRPC_CALLER_CONTEXT_KEY} from "server/trpc/context"
import type {Caller} from "server/trpc/router"
import {router} from "server/trpc/router"

interface CallerImplementation<TResult, TArgs extends readonly unknown[]> {
  (trpc: Caller, ...args: TArgs): Promise<TResult>
}

interface DecoratedCaller<TResult, TArgs extends readonly unknown[]> {
  (...args: TArgs): Promise<TResult>
}

/**
 * Calls `notFound()` if `TRPCError` with code `NOT_FOUND` occurred
 */
function maybeNotFoundError(error: unknown): never {
  if (error instanceof TRPCError && error.code === "NOT_FOUND") {
    notFound()
  }

  throw error
}

/**
 * Wraps a tRPC procedure caller with proper Next.js 13 error handling.
 *
 * Catches `NOT_FOUND` errors and shows 404 page.
 *
 * @param caller A function that executes tRPC query
 */
export function createCaller<TResult, TArgs extends readonly unknown[]>(
  caller: CallerImplementation<TResult, TArgs>
): DecoratedCaller<TResult, TArgs> {
  const trpc = router.createCaller({
    [TRPC_CALLER_CONTEXT_KEY]: true
  })

  return async function decoratedCaller(...args: TArgs): Promise<TResult> {
    try {
      const result = await caller(trpc, ...args)

      return result
    } catch (error) {
      maybeNotFoundError(error)
    }
  }
}
