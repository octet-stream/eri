import type {z} from "zod"

import {renderToMarkdown} from "@tiptap/static-renderer/pm/markdown"

import {extensions} from "../../../components/tiptap/extensions.js"
import {PostOutput} from "../post/PostOutput.js"

export const AdminPostUpdateOutput = PostOutput.transform(
  ({content, ...post}) => ({
    ...post,

    content: JSON.stringify(content.toJSON()),
    markdown: renderToMarkdown({extensions, content})
  })
)

export type IAdminPostUpdateOutput = z.input<typeof AdminPostUpdateOutput>

export type OAdminPostUpdateOutput = z.output<typeof AdminPostUpdateOutput>
