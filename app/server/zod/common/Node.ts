import {z} from "zod"

import {ID} from "./ID.ts"

export const Node = z.object({
  id: ID
})

export type INode = z.input<typeof Node>

export type ONode = z.output<typeof Node>
