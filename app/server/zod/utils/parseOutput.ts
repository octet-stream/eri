import type {z} from "zod"

import type {MaybePromise} from "../../../lib/types/MaybePromise.js"

import {resolveResult} from "./resolveResult.js"

export function parseOutput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema>,
  options?: {
    async?: false
  }
): z.output<TSchema>
export function parseOutput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema>,
  options: {
    async: true
  }
): Promise<z.output<TSchema>>
export function parseOutput<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: z.input<TSchema>,
  options?: {
    async?: boolean
  }
): MaybePromise<z.output<TSchema>> {
  if (!options?.async) {
    return resolveResult(schema.safeParse(data))
  }

  return schema.safeParseAsync(data).then(result => resolveResult(result))
}
