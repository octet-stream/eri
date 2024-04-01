import {z} from "zod"

import {PostContent} from "../plate/editors/PostContent.js"

export const PostCreateInput = z.object({
  title: z.string().min(1).max(255),
  content: PostContent
})

export type IPostCreateInput = z.input<typeof PostCreateInput>

export type OPostCreateInput = z.output<typeof PostCreateInput>
