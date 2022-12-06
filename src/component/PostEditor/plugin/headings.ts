import {
  createPlugins,
  createHeadingPlugin,

  KEYS_HEADING
} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"

import {Heading} from "../element/Heading"

export const headings = createPlugins<Value, Editor>(
  [
    createHeadingPlugin({
      options: {
        levels: 4
      }
    })
  ],

  {
    components: Object.fromEntries(KEYS_HEADING.map(key => [key, Heading]))
  }
)
