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
  createAlignPlugin,

  createPlateUI,
  PlateFloatingLink,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_PARAGRAPH,
  setAlign
} from "@udecode/plate"

import type {Plugin, Value, Editor} from "lib/type/Editor"

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
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_PARAGRAPH]
        }
      },
      handlers: {
        onKeyDown: editor => e => {
          if (!(e.metaKey && e.shiftKey)) {
            return undefined
          }

          const key = e.key.toLowerCase()

          switch (key) {
          case "l":
            setAlign(editor, {value: "left"})
            break
          case "e":
            setAlign(editor, {value: "center"})
            break
          case "r":
            e.preventDefault()
            setAlign(editor, {value: "right"})
            break
          case "j":
            setAlign(editor, {value: "justify"})
            break
          default:
            return undefined
          }
        }
      }
    }),

    autoformat() as any, // TODO: Fix types mismatch
    reset()
  ],

  {
    components: createPlateUI()
  }
)
