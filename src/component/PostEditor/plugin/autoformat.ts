import {
  createAutoformatPlugin,
  unwrapList,

  // Marks
  MARK_BOLD,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,

  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
} from "@udecode/plate"
import type {AutoformatPlugin, AutoformatBlockRule} from "@udecode/plate"

import {Value, Editor} from "lib/type/Editor"

type Plugin = AutoformatPlugin<Value, Editor>

type PreFormat = AutoformatBlockRule<Value, Editor>["preFormat"]

export const preFormat: PreFormat = editor => unwrapList(editor)

export const autoformat = () => createAutoformatPlugin<Plugin, Value, Editor>({
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
      },

      {
        mode: "block",
        type: ELEMENT_H2,
        match: "## ",
        preFormat
      },

      {
        mode: "block",
        type: ELEMENT_H3,
        match: "### ",
        preFormat
      },

      {
        mode: "block",
        type: ELEMENT_H4,
        match: "#### ",
        preFormat
      }
    ]
  }
})
