import type {z} from "zod"

import {Node} from "../common/Node.js"

import {PostBase} from "./PostBase.js"

export const PostNode = Node.merge(PostBase)

export type IPostNode = z.input<typeof PostNode>

export type OPostNode = z.output<typeof PostNode>
