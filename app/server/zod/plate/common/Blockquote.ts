import {BlockquotePlugin} from "@udecode/plate-block-quote"
import {z} from "zod"

import {createElementType} from "../utils/createElementType.js"

import {PlainText} from "./PlainText.js"

export const ElementBlockquote = z.literal(BlockquotePlugin.key)

export const Blockquote = createElementType(
  ElementBlockquote,

  z.array(PlainText).nonempty()
)

export type IBlockquote = z.input<typeof Blockquote>

export type OBlockquote = z.output<typeof Blockquote>
