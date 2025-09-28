import {z} from "zod"

export interface ResolveResultOptions<TOutput> {
  onError?(reason: z.ZodSafeParseError<TOutput>): never
}

function onErrorFallback<TOutput>(reason: z.ZodSafeParseError<TOutput>): never {
  throw Response.json(z.flattenError(reason.error), {
    status: 500
  })
}

export const resolveResult = <TOutput>(
  result: z.ZodSafeParseResult<TOutput>,
  options?: ResolveResultOptions<TOutput>
): TOutput => {
  if (result.success) {
    return result.data
  }

  if (typeof options?.onError === "function") {
    options.onError(result as any)
  }

  onErrorFallback(result)
}
