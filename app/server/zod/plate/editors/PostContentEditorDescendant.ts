import {z} from "zod"

import {Blockquote} from "../common/Blockquote.js"
import {Paragraph} from "../common/Paragraph.js"
import {CodeBlock} from "../common/CodeBlock.js"
import {Heading} from "../common/Heading.js"

export const PostContentEditorDescendant = z
  .array(z.union([Paragraph, Blockquote, Heading, CodeBlock]))
  .nonempty()

export type IPostContentEditorDescendant = z.input<
  typeof PostContentEditorDescendant
>

export type OPostContentEditorDescendant = z.output<
  typeof PostContentEditorDescendant
>
