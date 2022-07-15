import {z} from "zod"

import type {Constructable} from "server/lib/type/Constructable"

export interface IPageOutput<T> {
  items: T[]
  nextCursor: number | null
  prevCursor: number | null,
  total: number
}

/**
 * Creates a `Page<T>` output with the list of items is instance of `T`
 */
export const createPageOutput = <T extends Constructable>(cls: T) => z.object({
  items: z.array(z.instanceof(cls)),
  nextCursor: z.number().int().positive().nullable(),
  prevCursor: z.number().int().positive().nullable(),
  total: z.number().int().positive()
})
