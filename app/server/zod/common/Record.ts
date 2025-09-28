import {z} from "zod"

import {CommonDates} from "./CommonDates.ts"
import {Node} from "./Node.ts"

export const Record = z.object({
  ...Node.shape,
  ...CommonDates.shape
})

export type IRecord = z.input<typeof Record>

export type ORecord = z.output<typeof Record>
