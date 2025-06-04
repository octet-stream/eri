import type {z} from "zod"

import {PostOutput} from "../post/PostOutput.js"

export const AdminPostOutputEdit = PostOutput.transform(post => ({
  ...post,

  content: JSON.stringify(post.content) // TODO: Improve and unify validation for post content
}))

export type IAdminPostOutputEdit = z.input<typeof AdminPostOutputEdit>

export type OAdminPostOutputEdit = z.output<typeof AdminPostOutputEdit>
