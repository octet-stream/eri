import {z} from "zod"

import {PlainText} from "./PlainText.js"

const OptionalTrue = z.literal(true).optional()

export const RichTextBase = PlainText.extend({
  bold: OptionalTrue,
  italic: OptionalTrue,
  underline: OptionalTrue,
  strikethrough: OptionalTrue
})

export type IRichTextBase = z.input<typeof RichTextBase>

export type ORichTextBase = z.output<typeof RichTextBase>
