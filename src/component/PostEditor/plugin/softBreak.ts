import {createPlugins} from "@udecode/plate-core"
import {
  createSoftBreakPlugin,
  createExitBreakPlugin,

  ELEMENT_CODE_BLOCK,
  ELEMENT_BLOCKQUOTE,
  KEYS_HEADING
} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"

export const softBreak = createPlugins<Value, Editor>([
  createSoftBreakPlugin({
    options: {
      rules: [
        {
          hotkey: "shift+enter"
        },
        {
          hotkey: "enter",
          query: {
            allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE]
          }
        }
      ]
    }
  }),

  createExitBreakPlugin({
    options: {
      rules: [
        {
          hotkey: "mod+enter",
        },
        {
          hotkey: "mod+shift+enter",
          before: true,
        },
        {
          hotkey: "enter",
          query: {
            start: true,
            end: true,
            allow: KEYS_HEADING,
          }
        }
      ]
    }
  })
])
