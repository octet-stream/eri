import {createBlockquotePlugin} from "@udecode/plate-headless"
import {createPlugins} from "@udecode/plate-core"

import type {Value, Editor} from "lib/type/Editor"

import {Blockquote} from "../element/Blockquote"

export const blockquote = createPlugins<Value, Editor>([
  createBlockquotePlugin({component: Blockquote})
])
