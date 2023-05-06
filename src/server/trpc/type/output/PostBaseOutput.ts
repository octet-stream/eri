import type {input, output} from "zod"
import {z} from "zod"

import {Record} from "server/trpc/type/common/Record"

import {UserOutput} from "./UserOutput"

export const PostBaseOutput = Record.extend({
  title: z.string().min(1),
  slug: z.string().min(1),
  author: UserOutput.omit({
    createdAt: true,
    updatedAt: true
  })
})

export type IPostBaseOutput = input<typeof PostBaseOutput>

export type OPostBaseOutput = output<typeof PostBaseOutput>
