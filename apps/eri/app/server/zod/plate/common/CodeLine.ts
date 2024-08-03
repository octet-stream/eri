import {ELEMENT_CODE_LINE} from "@udecode/plate-code-block"
import {z} from "zod"

import {createElementType} from "../utils/createElementType.js"

import {PlainText} from "./PlainText.js"

export const ElementCodeLine = z.literal(ELEMENT_CODE_LINE)

export const CodeLine = createElementType(
  ElementCodeLine,

  z.array(PlainText).nonempty()
)

export type ICodeLine = z.input<typeof CodeLine>

export type OCodeLine = z.output<typeof CodeLine>
