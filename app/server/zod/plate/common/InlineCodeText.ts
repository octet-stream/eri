import {z} from "zod"

import {PlainText} from "./PlainText.js"

export const InlineCodeText = PlainText.extend({
  code: z.literal(true)
})

export type IInlineCodeText = z.input<typeof InlineCodeText>

export type OInlineCodeText = z.output<typeof InlineCodeText>
