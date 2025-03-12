import type {z} from "zod"

import type {MaybePromise} from "../../../lib/types/MaybePromise.js"
import {type ResolveResultOptions, resolveResult} from "./resolveResult.js"

function onError<TInput>(reason: z.SafeParseError<TInput>): never {
  throw Response.json(reason.error.flatten(), {
    status: 404
  })
}

export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams,
  options: ResolveResultOptions<z.input<TSchema>> & {async: true}
): Promise<z.output<TSchema>>
export function parseInput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema> | URLSearchParams,
  options?: ResolveResultOptions<z.input<TSchema>> & {async?: false}
): z.output<TSchema>
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
