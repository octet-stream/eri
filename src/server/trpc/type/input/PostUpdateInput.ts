import type {infer as Infer} from "zod"
import {z} from "zod"

import {PostCreateInput} from "./PostCreateInput"

export const PostUpdateInput = PostCreateInput.partial().extend({
  id: z.string().uuid()
})

export type TPostUpdateInput = Infer<typeof PostCreateInput>
