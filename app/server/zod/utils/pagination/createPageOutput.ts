import {z} from "zod"

import {Page} from "./Page.ts"
import {PageArgs} from "./PageArgs.ts"

/**
 * Creates a `Page<T>` output with the list of items of type `T`
 */
export const createPageOutput = <TOutput extends z.ZodRawShape>(
  output: z.ZodObject<TOutput>
) =>
  z
    .object({
      items: z.array(output),
      count: z.number().int(),
      args: z.instanceof(PageArgs)
    })
    .transform(page => new Page(page).toJSON())

export const DefaultPageOutput = createPageOutput(z.object({}))

export type IDefaultPageOutput = z.input<typeof DefaultPageOutput>

export type ODefaultPageOutput = z.output<typeof DefaultPageOutput>
