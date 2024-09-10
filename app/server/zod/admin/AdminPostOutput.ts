import type {z} from "zod"

import {PostOutput} from "../post/PostOutput.js"

export const AdminPostOutput = PostOutput.transform(post => ({
  ...post,

  content: JSON.stringify(post.content)
}))

export type IAdminPostOutput = z.input<typeof AdminPostOutput>

export type OAdminPostOutput = z.output<typeof AdminPostOutput>
