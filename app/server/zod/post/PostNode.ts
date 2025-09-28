import {z} from "zod"

import {Node} from "../common/Node.ts"

import {PostBase} from "./PostBase.ts"

export const PostNode = z.object({
  ...Node.shape,
  ...PostBase.shape
})

export type IPostNode = z.input<typeof PostNode>

export type OPostNode = z.output<typeof PostNode>
