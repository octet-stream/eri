import type {infer as Infer} from "zod"
import {z} from "zod"

export const Node = z.object({
  id: z.string().uuid()
})

export type TNode = Infer<typeof Node>
