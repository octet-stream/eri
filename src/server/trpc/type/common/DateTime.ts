import type {input, output} from "zod"
import {z} from "zod"

import {normalizeDate} from "lib/util/normalizeDate"

export const DateTime = z
  .union([z.date(), z.string(), z.number()])
  .transform(date => normalizeDate(date).toISOString())

export type IDateTime = input<typeof DateTime>

export type ODateTime = output<typeof DateTime>
