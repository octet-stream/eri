import {z} from "zod"

export const PostGetBySlugInput = z.object({
  slug: z.string().min(8).max(262) // TODO: Improve slug validation
})

export type IPostGetBySlugInput = z.input<typeof PostGetBySlugInput>

export type OPostGetBySlugInput = z.output<typeof PostGetBySlugInput>
