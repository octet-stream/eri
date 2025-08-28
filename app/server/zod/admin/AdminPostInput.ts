// Based on https://github.com/ProseMirror/prosemirror-markdown/blob/d671c2305446248f2c1138ea355b6c7e0bafc1f7/src/from_markdown.ts

import MarkdownIt from "markdown-it"
import {z} from "zod"

// import type Token from "markdown-it/lib/token.mjs"

import {getSchema} from "@tiptap/core"
import {MarkdownParser} from "@tiptap/pm/markdown"
import {Node} from "@tiptap/pm/model"

import {extensions} from "../../../components/post-editor/extensions.ts"

const schema = getSchema(extensions)

// function listIsTight(tokens: readonly Token[], i: number) {
//   while (++i < tokens.length)
//     // biome-ignore lint/suspicious/noDoubleEquals: Copied code
//     if (tokens[i].type != "list_item_open") return tokens[i].hidden
//   return false
// }

const md = new MarkdownParser(schema, MarkdownIt("commonmark", {html: false}), {
  // blockquote: {block: "blockquote"},
  paragraph: {block: "paragraph"},
  // list_item: {block: "list_item"},
  // bullet_list: {
  //   block: "bullet_list",
  //   getAttrs: (_, tokens, i) => ({tight: listIsTight(tokens, i)})
  // },
  // ordered_list: {
  //   block: "ordered_list",
  //   getAttrs: (tok, tokens, i) => ({
  //     // biome-ignore lint/style/noNonNullAssertion: Copied code
  //     order: +tok.attrGet("start")! || 1,
  //     tight: listIsTight(tokens, i)
  //   })
  // },
  heading: {block: "heading", getAttrs: tok => ({level: +tok.tag.slice(1)})},
  // code_block: {block: "code_block", noCloseToken: true},
  // fence: {
  //   block: "code_block",
  //   getAttrs: tok => ({params: tok.info || ""}),
  //   noCloseToken: true
  // },
  // hr: {node: "horizontal_rule"},
  // image: {
  //   node: "image",
  //   getAttrs: tok => ({
  //     src: tok.attrGet("src"),
  //     title: tok.attrGet("title") || null,
  //     // biome-ignore lint/style/noNonNullAssertion: Copied code
  //     // biome-ignore lint/complexity/useOptionalChain: Copied code
  //     alt: (tok.children![0] && tok.children![0].content) || null
  //   })
  // },
  // hardbreak: {node: "hard_break"},

  em: {mark: "em"},
  strong: {mark: "strong"},
  link: {
    mark: "link",
    getAttrs: tok => ({
      href: tok.attrGet("href"),
      title: tok.attrGet("title") || null
    })
  },
  code_inline: {mark: "code", noCloseToken: true}
})

const AdminPostEditorInput = z.object({
  fallback: z
    .string()
    .optional()
    .pipe(z.coerce.boolean().default(false))
    .pipe(z.literal(false).default(false)),
  content: z.string().min(1)
})

const AdminPostFallbackInput = z.object({
  fallback: z.string().pipe(z.coerce.boolean()).pipe(z.literal(true)),
  markdown: z.string().min(1)
})

const AdminPostEitherInput = z.union([
  AdminPostEditorInput,
  AdminPostFallbackInput
])

const AdminPostInputOutput = z.object({
  title: z.instanceof(Node),
  content: z.instanceof(Node)
})

type OAdminPostInputOutput = z.output<typeof AdminPostInputOutput>

function parseFromMarkdown(
  value: string,
  ctx: z.RefinementCtx
): OAdminPostInputOutput {
  const node = md.parse(value)

  const title = node.content.firstChild
  if (!title?.textContent || node.childCount < 2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Post must have title and content"
    })

    return z.NEVER
  }

  return {title, content: node}
}

function parseFromJsonString(
  value: string,
  ctx: z.RefinementCtx
): OAdminPostInputOutput {
  try {
    const node = Node.fromJSON(schema, JSON.parse(value))

    const title = node.content.firstChild
    if (!title?.textContent || node.childCount < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Post must have title and content"
      })

      return z.NEVER
    }

    return {content: node, title}
  } catch (error) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Can't parse post content: ${error}`
    })
  }

  return z.NEVER
}

export const AdminPostInput = AdminPostEitherInput.transform((value, ctx) => {
  if (value.fallback) {
    return parseFromMarkdown(value.markdown, ctx)
  }

  return parseFromJsonString(value.content, ctx)
}).pipe(AdminPostInputOutput)

export type IAdminPostInput = z.input<typeof AdminPostInput>

export type OAdminPostInput = z.output<typeof AdminPostInput>
