import type {infer as Infer} from "zod"
import {z} from "zod"

import {Record} from "server/trpc/type/common/Record"
import {EditorData} from "server/trpc/type/common/EditorData"

import {UserOutput} from "./UserOutput"

export const PostOutput = Record.extend({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: EditorData,
  author: UserOutput.omit({
    createdAt: true,
    updatedAt: true
  })
})

export type TPostOutput = Infer<typeof PostOutput>
