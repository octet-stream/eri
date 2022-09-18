/* eslint-disable @typescript-eslint/indent */
import {
  createPlugins,
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
  createLinkPlugin,
  createSoftBreakPlugin,
  createExitBreakPlugin,

  createPlateUI,
  PlateFloatingLink,
  CodeBlockElement,

  ELEMENT_CODE_BLOCK,
  ELEMENT_BLOCKQUOTE,
  KEYS_HEADING
} from "@udecode/plate"

import type {Value, Editor} from "lib/type/Editor"

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
    createLinkPlugin({renderAfterEditable: PlateFloatingLink}),

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
    components: createPlateUI({
      [ELEMENT_CODE_BLOCK]: CodeBlockElement
    })
  }
)