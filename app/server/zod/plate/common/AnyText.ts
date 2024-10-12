import {z} from "zod"

import {EmptyText} from "./EmptyText.js"
import {InlineCodeText} from "./InlineCodeText.js"
import {PlainText} from "./PlainText.js"
import {RichText} from "./RichText.js"

// ! FIXME: Fix formatting validation - all marks are getting removed for some reason
export const AnyText = z.union([EmptyText, InlineCodeText, RichText, PlainText])

export type IAnyText = z.input<typeof AnyText>

export type OAnyText = z.output<typeof AnyText>
