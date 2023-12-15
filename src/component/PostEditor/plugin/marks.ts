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
    component: createBasicMarkComponent("bold") as any
  }),
  createItalicPlugin({
    component: createBasicMarkComponent("italic") as any
  }),
  createStrikethroughPlugin({
    component: createBasicMarkComponent("strikethrough") as any
  }),
  createUnderlinePlugin({
    component: createBasicMarkComponent("underline") as any
  }),
  createSubscriptPlugin({
    component: createBasicMarkComponent("subscript") as any
  }),
  createSuperscriptPlugin({
    component: createBasicMarkComponent("superscript") as any
  })
])
