import {TRPCError} from "@trpc/server"

import {isFetchContext} from "server/trpc/context"

import {withRevalidate} from "./withRevalidate"

/**
 * Checks if `FetchContext` is present. This indicated that the procedure is being called within http request context.
 */
export const withFetchCotext = withRevalidate.unstable_pipe(({ctx, next}) => {
  if (!isFetchContext(ctx)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "FetchContext required for this operation"
    })
  }

  return next({ctx})
})
