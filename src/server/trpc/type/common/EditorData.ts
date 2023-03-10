import {z, ZodIssueCode, NEVER} from "zod"
import type {infer as Infer} from "zod"
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

export const WithId = z.object({
  id: z.string().uuid().optional().default(() => v4())
})

export type TWithId = Infer<typeof WithId>

export const Alignment = z.union([
  z.literal("left"),
  z.literal("center"),
  z.literal("right"),
  z.literal("justify")
])

export type TAlignment = Infer<typeof Alignment>

export const WithAlignment = z.object({
  align: Alignment.optional()
})

export type TWithAlignment = Infer<typeof WithAlignment>

export const PlainText = WithId.extend({
  text: z.string()
})

export type TPlainText = Infer<typeof PlainText>

export const EmptyText = PlainText.extend({
  text: z.literal("")
})

export type TEmptyText = Infer<typeof EmptyText>

export const RichText = PlainText.extend({
  bold: z.boolean().optional(),
  italic: z.boolean().optional(),
  underline: z.boolean().optional(),
  strikethrough: z.boolean().optional(),
  superscript: z.boolean().optional(),
  subscript: z.boolean().optional(),
  code: z.boolean().optional() // Maybe code must be in it's own type
})

export type TRichText = Infer<typeof RichText>

const AbstractElement = WithId.extend({
  type: z.string(),
  children: z.array(z.unknown())
})

export const Link = AbstractElement.extend({
  type: z.literal(ELEMENT_LINK),
  url: z.string(),
  children: z.array(RichText)
})

export type TLink = Infer<typeof Link>

export const InlineDescendant = z.union([Link, RichText])

export const InlineChildren = z.array(InlineDescendant)

export const Paragraph = AbstractElement.extend(WithAlignment.shape).extend({
  type: z.literal(ELEMENT_PARAGRAPH),
  children: InlineChildren
})

export type TParagraph = Infer<typeof Paragraph>

export const Blockquote = AbstractElement.extend({
  type: z.literal(ELEMENT_BLOCKQUOTE),
  children: InlineChildren
})

export type TBlockquote = Infer<typeof Blockquote>

export const CodeLine = AbstractElement.extend({
  type: z.literal(ELEMENT_CODE_LINE),
  children: z.array(PlainText)
})

export type TCodeLine = Infer<typeof CodeLine>

export const CodeBlock = AbstractElement.extend({
  type: z.literal(ELEMENT_CODE_BLOCK),
  children: z.array(CodeLine)
})

export type TCodeBlock = Infer<typeof CodeBlock>

export const HeadingTypes = z.union([
  z.literal(ELEMENT_H2),
  z.literal(ELEMENT_H3),
  z.literal(ELEMENT_H4)
])

export type THeadingTypes = Infer<typeof HeadingTypes>

export const HeadingElement = AbstractElement
  .extend(WithAlignment.shape)
  .extend({
    type: HeadingTypes,
    children: InlineChildren
  })

export type THeadingElement = Infer<typeof HeadingElement>

export const RootElement = z.union([
  Paragraph,
  HeadingElement,
  Blockquote,
  CodeBlock
])

export type TRootElement = Infer<typeof RootElement>

export const EditorData = z
  .array(RootElement)
  .superRefine((data, ctx): data is TRootElement[] => {
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

export type TEditorData = Infer<typeof EditorData>
