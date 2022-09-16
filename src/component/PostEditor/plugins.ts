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
  createCodePlugin,
  createLinkPlugin,

  createPlateUI,
  PlateFloatingLink
} from "@udecode/plate"

import type {Plugin, Value, Editor} from "lib/type/Editor"

import {alignment} from "./plugin/alignment"
import {autoformat} from "./plugin/autoformat"
import {reset} from "./plugin/reset"

export const plugins: Plugin[] = createPlugins<Value, Editor>(
  [
    createParagraphPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createUnderlinePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createCodePlugin(),
    createHeadingPlugin({
      options: {
        levels: 4
      }
    }),
    createLinkPlugin({renderAfterEditable: PlateFloatingLink}),

    alignment(),
    autoformat() as any, // TODO: Fix types mismatch
    reset()
  ],

  {
    components: createPlateUI()
  }
)
