import {z} from "zod"

import {PostCreateInput} from "./PostCreateInput.js"

export const ClientPostCreateInput = PostCreateInput.extend({
  content: z.string()
})

export type IClientPostCreateInput = z.input<typeof ClientPostCreateInput>

export type OClientPostCreateInput = z.output<typeof ClientPostCreateInput>
