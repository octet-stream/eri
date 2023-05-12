import {z} from "zod"

import {normalizeDate} from "lib/util/normalizeDate"

export const DateTime = z
  .union([z.date(), z.string(), z.number()])
  .transform(date => normalizeDate(date).toISOString())

export type IDateTime = z.input<typeof DateTime>

export type ODateTime = z.output<typeof DateTime>
