import type {infer as Infer} from "zod"
import {z} from "zod"

import {normalizeDate} from "lib/util/normalizeDate"

export const DateTime = z
  .union([z.string(), z.number().int().positive(), z.instanceof(Date)])
  .transform(date => normalizeDate(date))

export type TDateTime = Infer<typeof DateTime>
