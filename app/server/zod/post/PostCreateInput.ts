import {z} from "zod"

import {getSchema} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"

import {extensions} from "../../../components/tiptap/extensions.js"

export const PostCreateInput = z
  .object({
    content: z.string()
  })
  .transform((value, ctx) => {
    const schema = getSchema(extensions)
    const nodes = Node.fromJSON(schema, JSON.parse(value.content)) // TODO: Improve and unify validation for post content
    const title = nodes.content.firstChild

    if (!title?.textContent || nodes.childCount < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Post must have title and content"
      })

      return z.NEVER
    }

    return {title, content: nodes}
  })

export type IPostCreateInput = z.input<typeof PostCreateInput>

export type OPostCreateInput = z.output<typeof PostCreateInput>
