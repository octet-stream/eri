import {z} from "zod"

import {RichText} from "./RichText.js"
import {EmptyText} from "./EmptyText.js"
import {PlainText} from "./PlainText.js"
import {InlineCodeText} from "./InlineCodeText.js"

export const AnyText = z.union([EmptyText, PlainText, InlineCodeText, RichText])

export type IAnyText = z.input<typeof AnyText>

export type OAnyText = z.output<typeof AnyText>
