import {
  createResetNodePlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,

  ELEMENT_PARAGRAPH,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4
} from "@udecode/plate"
import type {ResetNodePluginRule} from "@udecode/plate"

import type {Value, Editor} from "lib/type/Editor"

type ResetRule = ResetNodePluginRule<Value, Editor>

const commonResetRule: Pick<ResetRule, "defaultType" | "types"> = {
  types: [ELEMENT_H2, ELEMENT_H3, ELEMENT_H4],
  defaultType: ELEMENT_PARAGRAPH
}

export const reset = () => createResetNodePlugin({
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
        predicate: isSelectionAtBlockStart,
      }
    ]
  }
})
