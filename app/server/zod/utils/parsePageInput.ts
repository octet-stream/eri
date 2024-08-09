import type {z} from "zod"

import type {DefaultPageInput} from "./createPageInput.js"

function resolve<TInput, TOutput>(
  result: z.SafeParseReturnType<TInput, TOutput>
): TOutput {
  if (!result.success) {
    throw Response.json(result.error.flatten(), {
      status: 404
    })
  }

  return result.data
}

export function parsePageInput<
  TSchema extends typeof DefaultPageInput
>(options: {
  input: z.input<TSchema> | URLSearchParams
  schema: TSchema
  async?: false
}): z.output<TSchema>
export function parsePageInput<
  TSchema extends typeof DefaultPageInput
>(options: {
  input: z.input<TSchema> | URLSearchParams
  schema: TSchema
  async: true
}): Promise<z.output<TSchema>>
export function parsePageInput<
  TSchema extends typeof DefaultPageInput
>(options: {
  input: z.input<TSchema> | URLSearchParams
  schema: TSchema
  async?: boolean
}): z.output<TSchema> | Promise<z.output<TSchema>> {
  const {input, schema, async: isAsync} = options

  if (!isAsync) {
    return resolve(schema.safeParse(input))
  }

  return schema.safeParseAsync(input).then(result => resolve(result))
}
