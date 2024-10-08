import type {z} from "zod"

import {resolveResult, type ResolveResultOptions} from "./resolveResult.js"
import type {MaybePromise} from "../../../lib/types/MaybePromise.js"

function onError<TInput>(reason: z.SafeParseError<TInput>): never {
  throw Response.json(reason.error.flatten(), {
    status: 404
  })
}

export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams,
  options?: ResolveResultOptions<z.input<TSchema>> & {async: true}
): MaybePromise<z.output<TSchema>>
export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams,
  options?: ResolveResultOptions<z.input<TSchema>> & {async?: false}
): MaybePromise<z.output<TSchema>>
export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams,
  options: ResolveResultOptions<z.input<TSchema>> & {async?: boolean} = {}
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
