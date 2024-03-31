import {z} from "zod"

import {ID} from "../../common/ID.js"

export const WithId = z.object({
  id: ID.default(() => crypto.randomUUID())
})

export type IWithId = z.input<typeof WithId>

export type OWithId = z.output<typeof WithId>
