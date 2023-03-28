import type {input, output} from "zod"
import {z} from "zod"

import {Slug} from "server/trpc/type/common/Slug"

export const PostGetBySlugInput = z.object({
  slug: Slug
})

export type IPostGetBySlugInput = input<typeof PostGetBySlugInput>

export type OPostGetBySlugInput = output<typeof PostGetBySlugInput>
