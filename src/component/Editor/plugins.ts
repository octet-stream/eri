import {
  createPlugins,
  createParagraphPlugin,
  createHeadingPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  createLinkPlugin,

  createPlateUI,
  PlateFloatingLink,
} from "@udecode/plate"

import type {Plugin, Value} from "lib/type/Editor"

export const plugins: Plugin[] = createPlugins<Value>(
  [
    createParagraphPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createStrikethroughPlugin(),
    createUnderlinePlugin(),
    createHeadingPlugin({
      options: {
        levels: 4
      }
    }),
    createLinkPlugin({
      renderAfterEditable: PlateFloatingLink
    })
  ],

  {
    components: createPlateUI()
  }
)
