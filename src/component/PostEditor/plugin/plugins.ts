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

import {alignment} from "./alignment"
import {autoformat} from "./autoformat"
import {reset} from "./reset"

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
