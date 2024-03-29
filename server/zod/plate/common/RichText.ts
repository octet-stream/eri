import {z} from "zod"

import {RichTextBase} from "./RichTextBase.js"
import {RichTextSubscript} from "./RichTextSubscript.js"
import {RichTextSuperscript} from "./RichTextSuperscript.js"

export const RichText = z.intersection(
  RichTextBase,

  z.union([RichTextSubscript, RichTextSuperscript])
)

export type IRichText = z.input<typeof RichText>

export type ORichText = z.output<typeof RichText>
