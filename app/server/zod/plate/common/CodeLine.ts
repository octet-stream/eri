import {CodeLinePlugin} from "@udecode/plate-code-block/react"
import {z} from "zod"

import {createElementType} from "../utils/createElementType.js"

import {PlainText} from "./PlainText.js"

export const ElementCodeLine = z.literal(CodeLinePlugin.key)

export const CodeLine = createElementType(
  ElementCodeLine,

  z.array(PlainText).nonempty()
)

export type ICodeLine = z.input<typeof CodeLine>

export type OCodeLine = z.output<typeof CodeLine>
