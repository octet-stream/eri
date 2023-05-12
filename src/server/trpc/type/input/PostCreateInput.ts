import {z} from "zod"

import {EditorData} from "server/trpc/type/common/EditorData"

export const PostCreateInput = z.object({
  title: z.string().min(1),
  content: EditorData
})

export type IPostCreateInput = z.input<typeof PostCreateInput>

export type OPostCreateInput = z.output<typeof PostCreateInput>
