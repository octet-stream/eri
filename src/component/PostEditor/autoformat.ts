import {
  createAutoformatPlugin as createAutoformat,

  // Marks
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from "@udecode/plate"
import type {AutoformatPlugin} from "@udecode/plate"

import {Value, Editor} from "lib/type/Editor"

type Plugin = AutoformatPlugin<Value, Editor>

export const createAutoformatPlugin = () => createAutoformat<Plugin>({
  options: {
    enableUndoOnDelete: true,
    rules: [
      {
        mode: "mark",
        type: MARK_BOLD,
        match: "**"
      },
      {
        mode: "mark",
        type: MARK_ITALIC,
        match: ["*", "_"]
      },
      {
        mode: "mark",
        type: MARK_UNDERLINE,
        match: "__"
      },
      {
        mode: "mark",
        type: MARK_STRIKETHROUGH,
        match: "~~"
      },
      {
        mode: "mark",
        type: MARK_SUPERSCRIPT,
        match: "^"
      },
      {
        mode: "mark",
        type: MARK_SUBSCRIPT,
        match: "~"
      },
      {
        mode: "mark",
        type: [MARK_UNDERLINE, MARK_ITALIC, MARK_BOLD],
        match: ["___**", "__***"]
      },
      {
        mode: "mark",
        type: [MARK_ITALIC, MARK_BOLD],
        match: ["_**", "***"]
      }
    ]
  }
})
