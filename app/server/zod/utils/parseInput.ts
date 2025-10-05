import {z} from "zod"

import type {MaybePromise} from "../../../lib/types/MaybePromise.ts"
import {type ResolveResultOptions, resolveResult} from "./resolveResult.ts"

function onError<TOutput>(reason: z.ZodSafeParseError<TOutput>): never {
  throw Response.json(z.treeifyError(reason.error), {
    status: 404
  })
}

export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams | FormData,
  options: ResolveResultOptions<z.output<TSchema>> & {async: true}
): Promise<z.output<TSchema>>
export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams | FormData,
  options?: ResolveResultOptions<z.output<TSchema>> & {async?: false}
): z.output<TSchema>
export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams | FormData,
  options: ResolveResultOptions<z.output<TSchema>> & {async?: boolean} = {}
): MaybePromise<z.output<TSchema>> {
  const {async, ...rest} = options

  if (!rest.onError) {
    rest.onError = onError
  }

  if (!async) {
    return resolveResult(schema.safeParse(data), rest)
  }

  return schema.safeParseAsync(data).then(output => resolveResult(output, rest))
}
