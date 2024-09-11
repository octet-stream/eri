import {z} from "zod"

import {PostUpdateInput} from "./PostUpdateInput.js"

export const ClientPostUpdateInput = PostUpdateInput.extend({
  content: z.string().min(1)
})

export type IClientPostUpdateInput = z.input<typeof ClientPostUpdateInput>

export type OClientPostUpdateInput = z.output<typeof ClientPostUpdateInput>
