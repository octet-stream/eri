import type {input, output} from "zod"
import {z} from "zod"

import {ID} from "./ID"

export const Node = z.object({
  id: ID
})

export type INode = input<typeof Node>

export type ONode = output<typeof Node>
