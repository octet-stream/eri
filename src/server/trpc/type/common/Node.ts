import type {infer as Infer} from "zod"
import {z} from "zod"

export const Node = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export interface INode extends Infer<typeof Node> { }
