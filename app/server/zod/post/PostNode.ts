import type {z} from "zod"

import {Node} from "../common/Node.ts"

import {PostBase} from "./PostBase.ts"

export const PostNode = Node.merge(PostBase)

export type IPostNode = z.input<typeof PostNode>

export type OPostNode = z.output<typeof PostNode>
