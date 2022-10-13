import {z, infer as Infer} from "zod"

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

export interface IPageInput extends Infer<typeof PageInput> { }
