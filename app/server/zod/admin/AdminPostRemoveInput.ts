import {z} from "zod"

import {PostSlug} from "../post/PostSlug.ts"

export const AdminPostRemoveInput = z.object({
  slug: PostSlug,
  permanent: z
    .union([z.string(), z.boolean()])
    .pipe(z.coerce.boolean<string | boolean>())
    .optional()
})

export type IAdminPostRemoveInput = z.input<typeof AdminPostRemoveInput>

export type OAdminPostRemoveInput = z.output<typeof AdminPostRemoveInput>
