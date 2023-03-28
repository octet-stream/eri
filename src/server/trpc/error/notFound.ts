import {TRPCError} from "@trpc/server"

export function notFound(message?: string): never {
  throw new TRPCError({code: "NOT_FOUND", message})
}
