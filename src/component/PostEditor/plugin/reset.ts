import {
  createResetNodePlugin,
  isSelectionAtBlockStart,
  isBlockAboveEmpty,

  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_PARAGRAPH,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
} from "@udecode/plate-headless"
import type {ResetNodePluginRule, ResetNodePlugin} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"

type Plugin = ResetNodePlugin<Value, Editor>

type ResetRule = ResetNodePluginRule<Value, Editor>

const commonResetRule: Pick<ResetRule, "defaultType" | "types"> = {
  defaultType: ELEMENT_PARAGRAPH,
  types: [
    ELEMENT_H2,
    ELEMENT_H3,
    ELEMENT_H4,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK
  ]
}

export const reset = () => createResetNodePlugin<Plugin, Value, Editor>({
  options: {
    rules: [
      {
        ...commonResetRule,

        hotkey: "Enter",
        predicate: isBlockAboveEmpty,
      },
      {
        ...commonResetRule,

        hotkey: "Backspace",
        predicate: isSelectionAtBlockStart
      }
    ]
  }
})
