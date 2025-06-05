import {z} from "zod"

import {getSchema} from "@tiptap/core"
import {Node} from "@tiptap/pm/model"

import {extensions} from "../../../components/tiptap/extensions.js"

export const AdminPostInput = z
  .object({
    content: z.string()
  })
  .transform((value, ctx) => {
    try {
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
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Can't parse post content: ${error}`
      })

      return z.NEVER
    }
  })
  .pipe(
    z.object({
      title: z.instanceof(Node),
      content: z.instanceof(Node)
    })
  )

export type IAdminPostInput = z.input<typeof AdminPostInput>

export type OAdminPostInput = z.output<typeof AdminPostInput>
