import {TRPCError} from "@trpc/server"

export function unauthorized(message?: string): never {
  throw new TRPCError({code: "UNAUTHORIZED", message})
}
