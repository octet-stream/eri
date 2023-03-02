import type {infer as Infer} from "zod"
import {z} from "zod"

import {ID} from "./ID"

export const Node = z.object({
  id: ID
})

export type TNode = Infer<typeof Node>
