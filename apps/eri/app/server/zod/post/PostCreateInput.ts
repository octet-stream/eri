import {z} from "zod"

import {PostContent} from "../plate/editors/PostContent.js"

export const PostCreateInput = z.object({
  title: z.string().min(1).max(255),
  content: z.string().transform(async (value, ctx) => {
    const result = await PostContent.safeParseAsync(JSON.parse(value || "[]"))

    if (result.success) {
      return result.data
    }

    result.error.issues.forEach(issue => ctx.addIssue(issue))

    return z.NEVER
  })
})

export type IPostCreateInput = z.input<typeof PostCreateInput>

export type OPostCreateInput = z.output<typeof PostCreateInput>
