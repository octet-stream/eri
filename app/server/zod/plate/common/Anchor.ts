import {LinkPlugin} from "@udecode/plate-link/react"
import {z} from "zod"

import {Text} from "./Text.js"

import {createElementType} from "../utils/createElementType.js"

export const ElementAnchor = z.literal(LinkPlugin.key)

export const Anchor = createElementType(
  ElementAnchor,
  z.array(Text).nonempty()
).extend({url: z.string().url()})

export type IAnchor = z.input<typeof Anchor>

export type OAnchor = z.output<typeof Anchor>
