import {CodeBlockPlugin} from "@udecode/plate-code-block"
import {z} from "zod"

import {CodeLine} from "./CodeLine.js"

import {createElementType} from "../utils/createElementType.js"

export const ElementCodeBlock = z.literal(CodeBlockPlugin.key)

export const CodeBlock = createElementType(
  ElementCodeBlock,

  z.array(CodeLine).nonempty()
).extend({lang: z.string().min(1)})

export type ICodeBlock = z.input<typeof CodeBlock>

export type OCodeBlock = z.output<typeof CodeBlock>
