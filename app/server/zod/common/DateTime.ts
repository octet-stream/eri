import {toDate} from "date-fns"
import {z} from "zod"

export const DateTime = z
  .union([z.string(), z.number(), z.date()])
  .transform(input => toDate(input))

export type IDateTime = z.input<typeof DateTime>

export type ODateTime = z.output<typeof DateTime>
