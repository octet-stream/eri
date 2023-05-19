import {z} from "zod"

import {Record} from "server/trpc/type/common/Record"
import {Slug} from "server/trpc/type/common/Slug"

import {UserOutput} from "./UserOutput"

export const PostBaseOutput = Record.extend({
  title: z.string().min(1),
  slug: Slug,
  author: UserOutput.omit({
    createdAt: true,
    updatedAt: true
  })
})

export type IPostBaseOutput = z.input<typeof PostBaseOutput>

export type OPostBaseOutput = z.output<typeof PostBaseOutput>
