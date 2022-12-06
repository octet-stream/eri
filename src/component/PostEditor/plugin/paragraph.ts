import {createParagraphPlugin} from "@udecode/plate-headless"
import {createPlugins} from "@udecode/plate-core"

import type {Value, Editor} from "lib/type/Editor"

export const paragraph = createPlugins<Value, Editor>([
  createParagraphPlugin()
])
