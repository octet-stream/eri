import type {z} from "zod"

import type {MaybePromise} from "../../../../lib/types/MaybePromise.js"

import type {DefaultPageInput} from "./createPageInput.js"

function resolve<
  TInput extends z.input<typeof DefaultPageInput>,
  TOutput extends z.output<typeof DefaultPageInput>
>(result: z.SafeParseReturnType<TInput, TOutput>): TOutput {
  if (!result.success) {
    throw Response.json(result.error.flatten(), {
      status: 404
    })
  }

  return result.data
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
    return resolve(schema.safeParse(input))
  }

  return schema.safeParseAsync(input).then(result => resolve(result))
}
