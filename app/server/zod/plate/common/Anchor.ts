import {ELEMENT_LINK} from "@udecode/plate-link"
import {z} from "zod"

import {Text} from "./Text.js"

import {createElementType} from "../utils/createElementType.js"

export const ElementAnchor = z.literal(ELEMENT_LINK)

export const Anchor = createElementType(
  ElementAnchor,
  z.array(Text).nonempty()
).extend({url: z.string().url()})

export type IAnchor = z.input<typeof Anchor>

export type OAnchor = z.output<typeof Anchor>
