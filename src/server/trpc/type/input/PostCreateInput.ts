import {z, infer as Infer} from "zod"

export const PostCreateInput = z.object({
  title: z.string(),
  text: z.string()
})

export interface IPostCreateInput extends Infer<typeof PostCreateInput> { }
