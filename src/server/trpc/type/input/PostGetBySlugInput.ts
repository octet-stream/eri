import {z} from "zod"

import {Slug} from "server/trpc/type/common/Slug"

export const PostGetBySlugInput = z.object({
  slug: Slug
})

export type IPostGetBySlugInput = z.input<typeof PostGetBySlugInput>

export type OPostGetBySlugInput = z.output<typeof PostGetBySlugInput>
