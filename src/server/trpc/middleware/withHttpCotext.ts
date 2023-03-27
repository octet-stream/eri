import {TRPCError} from "@trpc/server"

import {isHttpContext} from "server/trpc/context"
import {middleware} from "server/trpc/def"

export const withHttpCotext = middleware(({ctx, next}) => {
  if (!isHttpContext(ctx)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "SSRContext required for this operation"
    })
  }

  return next({ctx})
})
