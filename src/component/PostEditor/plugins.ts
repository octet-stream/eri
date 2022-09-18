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

  createPlateUI,
  PlateFloatingLink,
  CodeBlockElement,
  ELEMENT_CODE_BLOCK
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
