import {z, ZodIssueCode, NEVER} from "zod"
import {v4} from "uuid"
import type {
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE
} from "@udecode/plate-headless"

import isEmpty from "lodash/isEmpty"

import {isEditorContentEmpty} from "lib/util/isEditorContentEmpty"
import {isEmptyTextChild} from "lib/util/isEmptyTextChild"

export const ElementH2 = z.literal<typeof ELEMENT_H2>("h2")

export const ElementH3 = z.literal<typeof ELEMENT_H3>("h3")

export const ElementH4 = z.literal<typeof ELEMENT_H4>("h4")

export const ElementLink = z.literal<typeof ELEMENT_LINK>("a")

export const ElementParagraph = z.literal<typeof ELEMENT_PARAGRAPH>("p")

export const ElementBlockquote = z
  .literal<typeof ELEMENT_BLOCKQUOTE>("blockquote")

export const ElementCodeBlobk = z
  .literal<typeof ELEMENT_CODE_BLOCK>("code_block")

export const ElementCodeLine = z
  .literal<typeof ELEMENT_CODE_LINE>("code_line")

export const WithId = z.object({id: z.string().optional().default(() => v4())})

export type IWithId = z.input<typeof WithId>

export type OWithId = z.output<typeof WithId>

export const Alignment = z.union([
  z.literal("left"),
  z.literal("center"),
  z.literal("right"),
  z.literal("justify")
])

export type IAlignment = z.input<typeof Alignment>

export type OAlignment = z.output<typeof Alignment>

export const WithAlignment = z.object({
  align: Alignment.optional()
})

export type IWithAlignment = z.input<typeof WithAlignment>

export type OWithAlignment = z.output<typeof WithAlignment>

export const PlainText = WithId.extend({
  text: z.string()
})

export type IPlainText = z.input<typeof PlainText>

export type OPlainText = z.output<typeof PlainText>

export const EmptyText = PlainText.extend({
  text: z.literal("")
})

export type IEmptyText = z.input<typeof EmptyText>

export type OEmptyText = z.output<typeof EmptyText>

export const RichText = PlainText.extend({
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
  superscript: z.boolean().optional(),
  subscript: z.boolean().optional(),
  code: z.boolean().optional() // Maybe code must be in it's own type
})

export type IRichText = z.input<typeof RichText>

export type ORichText = z.output<typeof RichText>

export const InlineCode = PlainText.extend({
  code: z.boolean()
})

export type IInlineCode = z.input<typeof InlineCode>

export type OInlineCode = z.output<typeof InlineCode>

const AbstractElement = WithId.extend({
  type: z.string(),
  children: z.array(z.unknown())
})

export const Link = AbstractElement.extend({
  type: ElementLink,
  url: z.string(),
  children: z.array(z.union([PlainText, InlineCode, RichText]))
})

export type ILink = z.input<typeof Link>

export type OLink = z.output<typeof Link>

export const InlineDescendant = z.union([
  Link,
  InlineCode,
  EmptyText,
  PlainText,
  RichText
])

export type IInlineDescendant = z.input<typeof InlineDescendant>

export type OInlineDescendant = z.output<typeof InlineDescendant>

export const InlineChildren = z.array(InlineDescendant)

export type IInlineChildren = z.input<typeof InlineChildren>

export type OInlineChildren = z.output<typeof InlineChildren>

export const Paragraph = AbstractElement.extend(WithAlignment.shape).extend({
  type: ElementParagraph,
  children: InlineChildren
})

export type IParagraph = z.input<typeof Paragraph>

export type OParagraph = z.output<typeof Paragraph>

export const Blockquote = AbstractElement.extend({
  type: ElementBlockquote,
  children: InlineChildren
})

export type IBlockquote = z.input<typeof Blockquote>

export type OBlockquote = z.output<typeof Blockquote>

export const CodeLine = AbstractElement.extend({
  type: ElementCodeLine,
  children: z.array(PlainText)
})

export type ICodeLine = z.input<typeof CodeLine>

export type OCodeLine = z.output<typeof CodeLine>

export const CodeBlock = AbstractElement.extend({
  type: ElementCodeBlobk,
  lang: z.string(),
  children: z.array(CodeLine)
})

export type ICodeBlock = z.input<typeof CodeBlock>

export type OCodeBlock = z.output<typeof CodeBlock>

export const HeadingTypes = z.union([
  ElementH2,
  ElementH3,
  ElementH4
])

export type IHeadingTypes = z.input<typeof HeadingTypes>

export type OHeadingTypes = z.output<typeof HeadingTypes>

export const HeadingElement = AbstractElement
  .extend(WithAlignment.shape)
  .extend({
    type: HeadingTypes,
    children: InlineChildren
  })

export type IHeadingElement = z.input<typeof HeadingElement>

export type OHeadingElement = z.output<typeof HeadingElement>

export const RootElement = z.union([
  Paragraph,
  HeadingElement,
  Blockquote,
  CodeBlock
])

export type IRootElementI = z.input<typeof RootElement>

export type ORootElement = z.output<typeof RootElement>

export const EditorData = z
  .array(RootElement)
  .superRefine((data, ctx): data is ORootElement[] => {
    if (!isEditorContentEmpty(data)) {
      return NEVER
    }

    if (isEmpty(data)) {
      ctx.addIssue({
        code: ZodIssueCode.too_small,
        type: "array",
        inclusive: true, // Not sure about that
        minimum: 1,
        message: "EditorData must be at least of one Node element"
      })
    }

    if (isEmptyTextChild(data)) {
      ctx.addIssue({
        code: ZodIssueCode.invalid_type,
        expected: "array",
        received: "unknown",
        message: "EditorData must be at least of one non-empty paragraph"
      })
    }

    return NEVER
  })

export type IEditorData = z.input<typeof EditorData>

export type OEditorData = z.output<typeof EditorData>
