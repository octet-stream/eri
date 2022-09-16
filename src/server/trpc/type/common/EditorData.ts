import type {infer as Infer} from "zod"
import {z} from "zod"

import {ELEMENT_LINK, ELEMENT_PARAGRAPH} from "@udecode/plate"

import isEditorContentEmpty from "lib/util/isEditorContentEmpty"

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

const AbstractElement = z.object({
  type: z.string(),
  children: z.array(z.unknown())
})

export const Link = AbstractElement.extend({
  type: z.literal(ELEMENT_LINK),
  url: z.string(),
  children: z.array(RichText)
})

export const InlineDescendant = z.union([Link, RichText])

export const InlineChildren = z.array(InlineDescendant)

export const BlockElement = AbstractElement.extend({
  id: z.string().optional()
})

export const Paragraph = BlockElement.extend({
  type: z.literal(ELEMENT_PARAGRAPH),
  children: InlineChildren
})

export const HeadingTypes = z.union([
  z.literal("h2"),
  z.literal("h3"),
  z.literal("h4")
])

export const HeadingElement = AbstractElement.extend({
  type: HeadingTypes,
  children: InlineChildren
})

export const RootElement = z.union([Paragraph, HeadingElement])

export const EditorData = z
  .array(RootElement)
  .refine(
    value => isEditorContentEmpty(value) === false,

    {
      message: "Post content must be of at least one Node element"
    }
  )

export interface IEditorData extends Infer<typeof EditorData> { }
