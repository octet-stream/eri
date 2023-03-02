import {TRPCError} from "@trpc/server"

import {isSSRContext} from "server/trpc/context"
import {middleware} from "server/trpc/def"

export const ssrContextCheck = middleware(({ctx, next}) => {
  if (!isSSRContext(ctx)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "SSRContext required for this operation"
    })
  }

  return next({ctx})
})
