import {z, infer as Infer} from "zod"

import {Node} from "../common/Node"
import {EditorData} from "../common/EditorData"
import {UserOutput} from "./UserOutput"

export const PostOutput = Node.extend({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: EditorData,
  author: UserOutput
})

export interface IPostOutput extends Infer<typeof PostOutput> { }
