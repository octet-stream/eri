import {z} from "zod"

import {createPageInput, DefaultPageInput} from "./createPageInput.js"
import {Page} from "./Page.js"

/**
 * Creates a `Page<T>` output with the list of items of type `T`
 */
export const createPageOutput = <
  TOutput extends z.ZodRawShape,
  TInput extends ReturnType<typeof createPageInput>
>(
  output: z.ZodObject<TOutput>,
  input: TInput
) => z
  .object({
    items: z.array(output),
    count: z.number().int(),
    args: input.transform(({args}) => args)
  })
  .transform(page => new Page(page).toJSON())

export const DefaultPageOutput = createPageOutput(
  z.object({}),

  DefaultPageInput
)

export type IDefaultPageOutput = z.input<typeof DefaultPageOutput>

export type ODefaultPageOutput = z.output<typeof DefaultPageOutput>
