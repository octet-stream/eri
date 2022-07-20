import {z, ZodType} from "zod"

export interface IPageOutput<T> {
  items: T[]
  nextCursor: number | null
  prevCursor: number | null,
  total: number
}

/**
 * Creates a `Page<T>` output with the list of items is instance of `T`
 */
export const createPageOutput = <T>(t: ZodType<T>) => z.object({
  items: z.array(t),
  nextCursor: z.number().int().nonnegative().nullable(),
  prevCursor: z.number().int().nonnegative().nullable(),
  total: z.number().int().nonnegative()
})
