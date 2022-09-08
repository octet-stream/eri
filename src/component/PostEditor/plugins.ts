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
  PlateFloatingLink,
} from "@udecode/plate"

import type {Plugin, Value, Editor} from "lib/type/Editor"

import {createAutoformatPlugin} from "./autoformat"

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
    createLinkPlugin({
      renderAfterEditable: PlateFloatingLink
    }),
    createAutoformatPlugin() as any // TODO: Fix types mismatch
  ],

  {
    components: createPlateUI()
  }
)
