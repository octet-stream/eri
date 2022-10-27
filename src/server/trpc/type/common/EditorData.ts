import type {infer as Infer} from "zod"
import {z} from "zod"

import {
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE
} from "@udecode/plate-headless"

import {isEditorContentEmpty} from "lib/util/isEditorContentEmpty"

export const Align = z.object({
  align: z.union([
    z.literal("left"),
    z.literal("center"),
    z.literal("right"),
    z.literal("justify")
  ]).optional()
})

export const PlainText = z.object({
  text: z.string()
})

export const RichText = PlainText.extend({
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
  superscript: z.boolean().optional(),
  subscript: z.boolean().optional()
})

export interface IRichText extends Infer<typeof RichText> { }

const AbstractElement = z.object({
  type: z.string(),
  children: z.array(z.unknown())
})

export const Link = AbstractElement.extend({
  type: z.literal(ELEMENT_LINK),
  url: z.string(),
  children: z.array(RichText)
})

export interface ILink extends Infer<typeof Link> { }

export const InlineDescendant = z.union([Link, RichText])

export const InlineChildren = z.array(InlineDescendant)

export const BlockElement = AbstractElement.extend({
  id: z.string().optional()
})

export const Paragraph = BlockElement.extend(Align.shape).extend({
  type: z.literal(ELEMENT_PARAGRAPH),
  children: InlineChildren
})

export interface IParagraph extends Infer<typeof Paragraph> { }

export const Blockquote = BlockElement.extend({
  type: z.literal(ELEMENT_BLOCKQUOTE),
  children: InlineChildren
})

export interface IBlockquote extends Infer<typeof Blockquote> { }

export const CodeLine = BlockElement.extend({
  type: z.literal(ELEMENT_CODE_LINE),
  children: z.array(PlainText)
})

export interface ICodeLine extends Infer<typeof CodeLine> { }

export const CodeBlock = BlockElement.extend({
  type: z.literal(ELEMENT_CODE_BLOCK),
  children: z.array(CodeLine)
})

export interface ICodeBlock extends Infer<typeof CodeBlock> { }

export const HeadingTypes = z.union([
  z.literal(ELEMENT_H2),
  z.literal(ELEMENT_H3),
  z.literal(ELEMENT_H4)
])

export const HeadingElement = AbstractElement.extend(Align.shape).extend({
  type: HeadingTypes,
  children: InlineChildren
})

export interface IHeadingElement extends Infer<typeof HeadingElement> { }

export const RootElement = z.union([
  Paragraph,
  HeadingElement,
  Blockquote,
  CodeBlock
])

export const EditorData = z
  .array(RootElement)
  .refine(
    value => isEditorContentEmpty(value) === false,

    {
      message: "Post content must be of at least one Node element"
    }
  )

export interface IEditorData extends Infer<typeof EditorData> { }
