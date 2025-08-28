import {z} from "zod"

import {DateTime} from "./DateTime.ts"

export const CommonDates = z.object({
  createdAt: DateTime,
  updatedAt: DateTime
})

export type ICommonDates = z.input<typeof CommonDates>

export type OCommonDates = z.output<typeof CommonDates>
