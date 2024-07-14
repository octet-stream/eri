import {z} from "zod"

import {Blockquote} from "../common/Blockquote.js"
import {Paragraph} from "../common/Paragraph.js"
// import {CodeBlock} from "../common/CodeBlock.js"
import {Heading} from "../common/Heading.js"

export const PostContent = z
  .array(z.union([Paragraph, Blockquote, Heading]))
  .nonempty()

export type IPostContent = z.input<typeof PostContent>

export type OPostContent = z.output<typeof PostContent>
