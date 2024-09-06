import type {z} from "zod"

export interface ResolveResultOptions<TInput> {
  onError?(reason: z.SafeParseError<TInput>): never
}

function onErrorFallback<TInput>(reason: z.SafeParseError<TInput>): never {
  console.log(reason.error)
  throw Response.json(reason.error.flatten(), {
    status: 500
  })
}

export const resolveResult = <TInput, TOutput>(
  result: z.SafeParseReturnType<TInput, TOutput>,
  options?: ResolveResultOptions<TInput>
): TOutput => {
  if (result.success) {
    return result.data
  }

  if (typeof options?.onError === "function") {
    options.onError(result)
  }

  onErrorFallback(result)
}
