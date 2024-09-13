import {ParagraphPlugin} from "@udecode/plate-common/react"
import {z} from "zod"

import {InlineDescendant} from "./InlineDescendant.js"

import {createElementType} from "../utils/createElementType.js"

export const ElemetParagraph = z.literal(ParagraphPlugin.key)

export const Paragraph = createElementType(
  ElemetParagraph,

  z.array(InlineDescendant).nonempty()
)

export type IParagraph = z.input<typeof Paragraph>

export type OParagraph = z.output<typeof Paragraph>
