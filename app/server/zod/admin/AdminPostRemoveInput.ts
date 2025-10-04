import {z} from "zod"

import {PostSlug} from "../post/PostSlug.ts"

export const AdminPostRemoveInput = z.object({
  slug: PostSlug,
  permanent: z.boolean().optional()
})

export type IAdminPostRemoveInput = z.input<typeof AdminPostRemoveInput>

export type OAdminPostRemoveInput = z.output<typeof AdminPostRemoveInput>
