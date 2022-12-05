/* eslint-disable @typescript-eslint/indent */

import {createPlugins} from "@udecode/plate-core"

import {
  createLinkPlugin,
  createParagraphPlugin,
  createHeadingPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createBlockquotePlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createSoftBreakPlugin,
  createExitBreakPlugin,

  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_SUPERSCRIPT,
  MARK_SUBSCRIPT,

  ELEMENT_CODE_BLOCK,
  ELEMENT_BLOCKQUOTE,
  KEYS_HEADING,
} from "@udecode/plate-headless"

import type {Value, Editor} from "lib/type/Editor"
import {createBasicMarkComponent} from "component/PostEditor/util/createBasicMarkComponent"

import {alignment} from "./plugin/alignment"
import {autoformat} from "./plugin/autoformat"
import {reset} from "./plugin/reset"

export const plugins = createPlugins<Value, Editor>(
  [
    createParagraphPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createUnderlinePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createCodePlugin(),
    createCodeBlockPlugin(),
    createBlockquotePlugin(),
    createHeadingPlugin({options: {levels: 4}}),
    createLinkPlugin({
      // renderAfterEditable: PlateFloatingLink
    }),

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
            },
          },
        ],
      },
    }),

    alignment(),
    autoformat(),
    reset()
  ],

  {
    components: {
      [MARK_BOLD]: createBasicMarkComponent("bold"),
      [MARK_ITALIC]: createBasicMarkComponent("italic"),
      [MARK_UNDERLINE]: createBasicMarkComponent("underline"),
      [MARK_SUBSCRIPT]: createBasicMarkComponent("subscript"),
      [MARK_SUPERSCRIPT]: createBasicMarkComponent("superscript"),
      [MARK_STRIKETHROUGH]: createBasicMarkComponent("strikethrough")
    }
  }
)
