import {z} from "zod"

import {Anchor} from "./Anchor.js"
import {AnyText} from "./AnyText.js"

export const InlineDescendant = z.union([AnyText, Anchor])

export type IInlineDescendant = z.input<typeof InlineDescendant>

export type OInlineDescendant = z.output<typeof InlineDescendant>
