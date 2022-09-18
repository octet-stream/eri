import {
  createAutoformatPlugin,
  unwrapList,
  insertEmptyCodeBlock,

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
  ELEMENT_PARAGRAPH,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  getPluginType
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
      // Marks
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

      // Blocks
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
      },
      {
        mode: "block",
        type: ELEMENT_BLOCKQUOTE,
        match: "> ",
        preFormat
      },
      {
        mode: "block",
        type: ELEMENT_CODE_BLOCK,
        match: "```",
        triggerAtBlockStart: true,
        preFormat,
        format(editor) {
          insertEmptyCodeBlock(editor, {
            defaultType: getPluginType(editor, ELEMENT_PARAGRAPH),
            insertNodesOptions: {
              select: true
            }
          })
        }
      }
    ]
  }
})
