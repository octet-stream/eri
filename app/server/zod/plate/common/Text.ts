import {z} from "zod"

import {InlineCodeText} from "./InlineCodeText.js"
import {PlainText} from "./PlainText.js"
import {RichText} from "./RichText.js"

export const Text = z.union([PlainText, InlineCodeText, RichText])

export type IText = z.input<typeof Text>

export type OText = z.output<typeof Text>
