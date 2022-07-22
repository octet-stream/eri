import {z, infer as Infer} from "zod"

export const PageInput = z
  .object({
    cursor: z.number().int().positive(),
    limit: z.number()
      .int()
      .positive()
      .max(50)
      .default(50)
      .optional()
  })
  .default({
    cursor: 1
  })

export interface IPageInput extends Infer<typeof PageInput> { }
