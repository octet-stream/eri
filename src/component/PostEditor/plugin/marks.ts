import {
  createBoldPlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin
} from "@udecode/plate-headless"
import {createPlugins} from "@udecode/plate-core"

import type {Value, Editor} from "lib/type/Editor"

import {createBasicMarkComponent} from "../util/createBasicMarkComponent"

export const marks = createPlugins<Value, Editor>([
  createBoldPlugin({
    component: createBasicMarkComponent("bold")
  }),
  createItalicPlugin({
    component: createBasicMarkComponent("italic")
  }),
  createStrikethroughPlugin({
    component: createBasicMarkComponent("strikethrough")
  }),
  createUnderlinePlugin({
    component: createBasicMarkComponent("underline")
  }),
  createSubscriptPlugin({
    component: createBasicMarkComponent("subscript")
  }),
  createSuperscriptPlugin({
    component: createBasicMarkComponent("superscript")
  })
])
