import {renderToMarkdown} from "@tiptap/static-renderer/pm/markdown"
import type {z} from "zod"

import {extensions} from "../../../components/post-editor/PostEditor.tsx"
import {PostOutput} from "../post/PostOutput.ts"

export const AdminPostUpdateOutput = PostOutput.transform(
  ({content, ...post}) => ({
    ...post,

    content: JSON.stringify(content.toJSON()),
    markdown: renderToMarkdown({extensions, content})
  })
)

export type IAdminPostUpdateOutput = z.input<typeof AdminPostUpdateOutput>

export type OAdminPostUpdateOutput = z.output<typeof AdminPostUpdateOutput>
