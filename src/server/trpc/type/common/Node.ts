import type {infer as Infer} from "zod"
import {z} from "zod"

import {DateTime} from "./DateTime"

export const Node = z.object({
  id: z.string().uuid(),
  createdAt: DateTime,
  updatedAt: DateTime
})

export type TNode = Infer<typeof Node>
