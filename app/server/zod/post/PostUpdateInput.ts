import type {z} from "zod"

import {Node} from "../common/Node.js"
import {PostCreateInput} from "./PostCreateInput.js"

export const PostUpdateInput = Node.extend(PostCreateInput.partial().shape)

export type IPostUpdateInput = z.input<typeof PostUpdateInput>

export type OPostUpdateInput = z.output<typeof PostUpdateInput>
