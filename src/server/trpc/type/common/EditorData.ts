import {z, ZodIssueCode, NEVER} from "zod"
import type {input, output} from "zod"
import {v4} from "uuid"
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

import isEmpty from "lodash/isEmpty"

import {isEditorContentEmpty} from "lib/util/isEditorContentEmpty"
import {isEmptyTextChild} from "lib/util/isEmptyTextChild"

export const WithId = z.object({id: z.string().optional().default(() => v4())})

export type IWithId = input<typeof WithId>

export type OWithId = output<typeof WithId>

export const Alignment = z.union([
  z.literal("left"),
  z.literal("center"),
  z.literal("right"),
  z.literal("justify")
])

export type IAlignment = input<typeof Alignment>

export type OAlignment = output<typeof Alignment>

export const WithAlignment = z.object({
  align: Alignment.optional()
})

export type IWithAlignment = input<typeof WithAlignment>

export type OWithAlignment = output<typeof WithAlignment>

export const PlainText = WithId.extend({
  text: z.string()
})

export type IPlainText = input<typeof PlainText>

export type OPlainText = output<typeof PlainText>

export const EmptyText = PlainText.extend({
  text: z.literal("")
})

export type IEmptyText = input<typeof EmptyText>

export type OEmptyText = output<typeof EmptyText>

export const RichText = PlainText.extend({
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
  superscript: z.boolean().optional(),
  subscript: z.boolean().optional(),
  code: z.boolean().optional() // Maybe code must be in it's own type
})

export type IRichText = input<typeof RichText>

export type ORichText = output<typeof RichText>

export const InlineCode = PlainText.extend({
  code: z.boolean()
})

export type IInlineCode = input<typeof InlineCode>

export type OInlineCode = output<typeof InlineCode>

const AbstractElement = WithId.extend({
  type: z.string(),
  children: z.array(z.unknown())
})

export const Link = AbstractElement.extend({
  type: z.literal(ELEMENT_LINK),
  url: z.string(),
  children: z.array(z.union([PlainText, InlineCode, RichText]))
})

export type ILink = input<typeof Link>

export type OLink = output<typeof Link>

export const InlineDescendant = z.union([
  Link,
  InlineCode,
  EmptyText,
  PlainText,
  RichText
])

export type IInlineDescendant = input<typeof InlineDescendant>

export type OInlineDescendant = output<typeof InlineDescendant>

export const InlineChildren = z.array(InlineDescendant)

export type IInlineChildren = input<typeof InlineChildren>

export type OInlineChildren = output<typeof InlineChildren>

export const Paragraph = AbstractElement.extend(WithAlignment.shape).extend({
  type: z.literal(ELEMENT_PARAGRAPH),
  children: InlineChildren
})

export type IParagraph = input<typeof Paragraph>

export type OParagraph = output<typeof Paragraph>

export const Blockquote = AbstractElement.extend({
  type: z.literal(ELEMENT_BLOCKQUOTE),
  children: InlineChildren
})

export type IBlockquote = input<typeof Blockquote>

export type OBlockquote = output<typeof Blockquote>

export const CodeLine = AbstractElement.extend({
  type: z.literal(ELEMENT_CODE_LINE),
  children: z.array(PlainText)
})

export type ICodeLine = input<typeof CodeLine>

export type OCodeLine = output<typeof CodeLine>

export const CodeBlock = AbstractElement.extend({
  type: z.literal(ELEMENT_CODE_BLOCK),
  children: z.array(CodeLine)
})

export type ICodeBlock = input<typeof CodeBlock>

export type OCodeBlock = output<typeof CodeBlock>

export const HeadingTypes = z.union([
  z.literal(ELEMENT_H2),
  z.literal(ELEMENT_H3),
  z.literal(ELEMENT_H4)
])

export type IHeadingTypes = input<typeof HeadingTypes>

export type OHeadingTypes = output<typeof HeadingTypes>

export const HeadingElement = AbstractElement
  .extend(WithAlignment.shape)
  .extend({
    type: HeadingTypes,
    children: InlineChildren
  })

export type IHeadingElement = input<typeof HeadingElement>

export type OHeadingElement = output<typeof HeadingElement>

export const RootElement = z.union([
  Paragraph,
  HeadingElement,
  Blockquote,
  CodeBlock
])

export type IRootElementI = input<typeof RootElement>

export type ORootElement = output<typeof RootElement>

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

export type IEditorData = input<typeof EditorData>

export type OEditorData = output<typeof EditorData>
