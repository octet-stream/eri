import {z} from "zod"

import {ID} from "../../common/ID.js"

export const WithId = z.object({
  id: z
    .string()
    .optional()
    .transform(async value => {
      if (!value) {
        return crypto.randomUUID()
      }

      const result = await ID.safeParseAsync(value)

      if (result.success) {
        return result.data
      }

      return crypto.randomUUID()
    })
})

export type IWithId = z.input<typeof WithId>

export type OWithId = z.output<typeof WithId>
