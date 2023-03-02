import type {infer as Infer} from "zod"
import {z} from "zod"

import {Node} from "../common/Node"
import {EditorData} from "../common/EditorData"
import {UserOutput} from "./UserOutput"

export const PostOutput = Node.extend({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: EditorData,
  author: UserOutput.omit({
    createdAt: true,
    updatedAt: true
  })
})

export type TPostOutput = Infer<typeof PostOutput>
