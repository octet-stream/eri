import type {z} from "zod"

import {PostOutput} from "../post/PostOutput.js"

export const AdminPostUpdateOutput = PostOutput.transform(
  ({content, ...post}) => ({
    ...post,

    content: JSON.stringify(content.toJSON())
  })
)

export type IAdminPostUpdateOutput = z.input<typeof AdminPostUpdateOutput>

export type OAdminPostUpdateOutput = z.output<typeof AdminPostUpdateOutput>
