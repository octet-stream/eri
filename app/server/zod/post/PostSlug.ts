import {z} from "zod"

export const PostSlug = z
  .object({
    date: z.string().date(),
    name: z.string().min(8).max(252)
  })
  .transform(({date, name}) => [date, name].join("/"))

export type IPostSlug = z.input<typeof PostSlug>

export type OPostSlug = z.output<typeof PostSlug>
