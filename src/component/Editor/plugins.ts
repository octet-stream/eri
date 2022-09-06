import {
  createParagraphPlugin,
  createHeadingPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin
} from "@udecode/plate"

import type {Plugin} from "lib/type/Editor"

export const plugins: Plugin[] = [
  createParagraphPlugin(),
  createBoldPlugin(),
  createItalicPlugin(),
  createStrikethroughPlugin(),
  createUnderlinePlugin(),
  createHeadingPlugin({
    options: {
      levels: 4
    }
  })
]
