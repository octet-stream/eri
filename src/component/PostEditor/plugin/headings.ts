import {
  createPlugins,
  createHeadingPlugin,

  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4
} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"

import {createHeadingElement} from "../util/createHeadingElement"

const types = [ELEMENT_H2, ELEMENT_H3, ELEMENT_H4] as const

export const headings = createPlugins<Value, Editor>(
  [
    createHeadingPlugin({
      options: {
        levels: 4
      }
    })
  ],

  {
    components: Object.fromEntries(
      types.map(t => [t, createHeadingElement(t)])
    ) as any
  }
)
