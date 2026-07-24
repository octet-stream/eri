import {getSchema} from "@tiptap/core"
import {Markdown, MarkdownManager} from "@tiptap/markdown"
import {Node} from "@tiptap/pm/model"
import {match, P} from "ts-pattern"
import {z} from "zod"

import {extensions} from "../../../components/post-editor/extensions.ts"

const schema = getSchema(extensions)

const manager = new MarkdownManager({
  extensions: [...extensions, Markdown]
})

const AdminPostEditorInput = z.object({
  fallback: z
    .string()
    .optional()
    .pipe(z.coerce.boolean())
    .pipe(z.literal(false))
    .default(false),
  content: z.string().min(1)
})

const AdminPostFallbackInput = z.object({
  fallback: z.union([
    z.literal(true),
    z
      .literal("true")
      .transform(input => input === "true")
      .pipe(z.literal(true))
  ]),
  markdown: z.string().min(1)
})

const AdminPostEitherInput = z.union([
  AdminPostEditorInput,
  AdminPostFallbackInput
])

function parseFromMarkdown(value: string, ctx: z.RefinementCtx): Node {
  try {
    const node = Node.fromJSON(schema, manager.parse(value))

    return node
  } catch (error) {
    ctx.addIssue({
      code: "custom",
      message: `Can't parse post content: ${error}`
    })
  }

  return z.NEVER
}

function parseFromJsonString(value: string, ctx: z.RefinementCtx): Node {
  try {
    const node = Node.fromJSON(schema, JSON.parse(value))

    return node
  } catch (error) {
    ctx.addIssue({
      code: "custom",
      message: `Can't parse post content: ${error}`
    })
  }

  return z.NEVER
}

// TODO: Validate post content against schema
export const AdminPostInput = AdminPostEitherInput.transform((value, ctx) =>
  match(value)
    .with(
      {fallback: P.when((value): value is true => !!value)},

      ({markdown}) => parseFromMarkdown(markdown, ctx)
    )
    .otherwise(({content}) => parseFromJsonString(content, ctx))
)
  .check(ctx => {
    try {
      ctx.value.check()
    } catch (error) {
      if (!(error instanceof RangeError)) {
        throw error
      }

      ctx.issues.push({
        code: "custom",
        input: ctx.value,
        message: error.message
      })
    }
  })
  .check(ctx => {
    const node = ctx.value

    const title = node.content.firstChild
    if (!title?.textContent || node.childCount < 2) {
      ctx.issues.push({
        code: "custom",
        message: "Post must have title and content",
        input: node
      })
    }
  })

export type IAdminPostInput = z.input<typeof AdminPostInput>

export type OAdminPostInput = z.output<typeof AdminPostInput>
