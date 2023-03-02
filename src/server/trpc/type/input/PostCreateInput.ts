import type {infer as Infer} from "zod"
import {z} from "zod"

import {EditorData} from "server/trpc/type/common/EditorData"

export const PostCreateInput = z.object({
  title: z.string().min(1),
  content: EditorData
})

export type TPostCreateInput = Infer<typeof PostCreateInput>
