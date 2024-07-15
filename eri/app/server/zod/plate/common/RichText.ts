import {z} from "zod"

import {PlainText} from "./PlainText.js"

const OptionalTrue = z.literal(true).optional()

export const RichText = PlainText.extend({
  bold: OptionalTrue,
  italic: OptionalTrue,
  underline: OptionalTrue,
  strikethrough: OptionalTrue,
  subscript: OptionalTrue,
  superscript: OptionalTrue,
  kbd: OptionalTrue
})

export type IRichText = z.input<typeof RichText>

export type ORichText = z.output<typeof RichText>
