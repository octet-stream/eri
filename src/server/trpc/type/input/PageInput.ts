import type {infer as Infer} from "zod"
import {z} from "zod"

export const PageInput = z
  .object({
    cursor: z
      .number()
      .int()
      .positive()
      .nullable()
      .default(1),
    limit: z
      .number()
      .int()
      .positive()
      .max(50)
      .optional()
      .default(50)
  })
  .default({})

export type TPageInput = Infer<typeof PageInput>
