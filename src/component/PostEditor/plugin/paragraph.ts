import {createParagraphPlugin} from "@udecode/plate-headless"
import {createPlugins} from "@udecode/plate-core"

import type {Value, Editor} from "lib/type/Editor"

import {Paragraph} from "../element/Paragraph"

export const paragraph = createPlugins<Value, Editor>([
  createParagraphPlugin({component: Paragraph as any})
])
