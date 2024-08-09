import type {z} from "zod"

import type {MaybePromise} from "../../../lib/types/MaybePromise.js"

function resolve<TInput, TOutput>(
  result: z.SafeParseReturnType<TInput, TOutput>
): TOutput {
  if (result.error) {
    throw Response.json(result.error.flatten(), {
      status: 500
    })
  }

  return result.data
}

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
    return resolve(schema.safeParse(data))
  }

  return schema.safeParseAsync(data).then(result => resolve(result))
}
