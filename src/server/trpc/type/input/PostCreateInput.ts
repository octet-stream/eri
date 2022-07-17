import {z, infer as Infer} from "zod"

import {EditorData} from "server/trpc/type/common/EditorData"

export const PostCreateInput = z.object({
  title: z.string(),
  content: EditorData
})

export interface IPostCreateInput extends Infer<typeof PostCreateInput> { }
