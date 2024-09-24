import type {z} from "zod"

import {PostOutputBase} from "../post/PostOutputBase.js"

export const AdminPostOutputEdit = PostOutputBase.transform(post => ({
  ...post,

  content: JSON.stringify(post.content)
}))

export type IAdminPostOutputEdit = z.input<typeof AdminPostOutputEdit>

export type OAdminPostOutputEdit = z.output<typeof AdminPostOutputEdit>
