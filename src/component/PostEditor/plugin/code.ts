import {createPlugins} from "@udecode/plate-core"
import {
  createCodePlugin,
  // createCodeBlockPlugin
} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"

import {Code} from "../leaf/Code"

export const code = createPlugins<Value, Editor>([
  createCodePlugin({component: Code}),
  // createCodeBlockPlugin()
])
