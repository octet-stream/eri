import type {z} from "zod"

import {PostCreateInput} from "./PostCreateInput.js"

export const PostUpdateInput = PostCreateInput

export type IPostUpdateInput = z.input<typeof PostUpdateInput>

export type OPostUpdateInput = z.output<typeof PostUpdateInput>
