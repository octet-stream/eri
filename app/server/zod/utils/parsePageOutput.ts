import type {z} from "zod"

import type {MaybePromise} from "../../../lib/types/MaybePromise.js"

import type {DefaultPageOutput} from "./createPageOutput.js"

function resolve<
  TInput extends z.input<typeof DefaultPageOutput>,
  TOutput extends z.output<typeof DefaultPageOutput>
>(result: z.SafeParseReturnType<TInput, TOutput>): TOutput {
  if (!result.success) {
    throw Response.json(result.error.flatten(), {
      status: 500
    })
  }

  const {data} = result

  if (data.pagesCount > 0 && data.current > data.pagesCount) {
    throw new Response(null, {
      status: 404
    })
  }

  return data
}

export function parsePageOutput<TSchema extends typeof DefaultPageOutput>(
  schema: TSchema,
  input: z.input<TSchema>,
  options?: {
    async?: false
  }
): z.output<TSchema>
export function parsePageOutput<TSchema extends typeof DefaultPageOutput>(
  schema: TSchema,
  input: z.input<TSchema>,
  options: {
    async: true
  }
): Promise<z.output<TSchema>>
export function parsePageOutput<TSchema extends typeof DefaultPageOutput>(
  schema: TSchema,
  input: z.input<TSchema>,
  options?: {
    async?: boolean
  }
): MaybePromise<z.output<TSchema>> {
  if (!options?.async) {
    return resolve(schema.safeParse(input))
  }

  return schema.safeParseAsync(input).then(result => resolve(result))
}
