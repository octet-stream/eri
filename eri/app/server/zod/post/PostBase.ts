import {z} from "zod"

export const PostBase = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(8).max(262) // TODO: Improve slug validation
})

export type IPostBase = z.input<typeof PostBase>

export type OPostBase = z.output<typeof PostBase>
