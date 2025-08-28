import {z} from "zod"

import type {MaybePromise} from "../../../../lib/types/MaybePromise.ts"
import {resolveResult} from "../resolveResult.ts"

import type {DefaultPageInput} from "./createPageInput.ts"

function onError<TOutput>(reason: z.ZodSafeParseError<TOutput>): never {
  throw Response.json(z.flattenError(reason.error), {
    status: 404
  })
}

export function parsePageInput<TSchema extends typeof DefaultPageInput>(
  schema: TSchema,
  input: z.input<TSchema> | URLSearchParams,
  options?: {
    async?: false
  }
): z.output<TSchema>
export function parsePageInput<TSchema extends typeof DefaultPageInput>(
  schema: TSchema,
  input: z.input<TSchema> | URLSearchParams,
  options: {
    async: true
  }
): Promise<z.output<TSchema>>
export function parsePageInput<TSchema extends typeof DefaultPageInput>(
  schema: TSchema,
  input: z.input<TSchema> | URLSearchParams,
  options?: {
    async?: boolean
  }
): MaybePromise<z.output<TSchema>> {
  if (!options?.async) {
    // @ts-expect-error Fix this later
    return resolveResult(schema.safeParse(input), {
      onError
    })
  }

  // @ts-expect-error Fix this later
  return schema.safeParseAsync(input).then(result =>
    resolveResult(result, {
      onError
    })
  )
}
