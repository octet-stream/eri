import {ELEMENT_PARAGRAPH} from "@udecode/plate-paragraph"
import {z} from "zod"

import {InlineDescendant} from "./InlineDescendant.js"

import {createElementType} from "../utils/createElementType.js"

export const ElemetParagraph = z.literal(ELEMENT_PARAGRAPH)

export const Paragraph = createElementType(
  ElemetParagraph,

  z.array(InlineDescendant).nonempty()
)

export type IParagraph = z.input<typeof Paragraph>

export type OParagraph = z.output<typeof Paragraph>
