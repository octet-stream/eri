import {createPlugins, createHeadingPlugin} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"

export const headings = createPlugins<Value, Editor>([
  createHeadingPlugin({options: {levels: 4}})
])
