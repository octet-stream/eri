import {withProps} from "@udecode/cn"
import {
  createPlugins,
  RenderAfterEditable,
  PlateLeaf
} from "@udecode/plate-common"
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH
} from "@udecode/plate-paragraph"
import {
  createHeadingPlugin,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6
} from "@udecode/plate-heading"
import {
  createBlockquotePlugin,
  ELEMENT_BLOCKQUOTE
} from "@udecode/plate-block-quote"
import {
  createCodeBlockPlugin,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_CODE_SYNTAX
} from "@udecode/plate-code-block"
import {createLinkPlugin, ELEMENT_LINK} from "@udecode/plate-link"
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
  createStrikethroughPlugin,
  MARK_STRIKETHROUGH,
  createCodePlugin,
  MARK_CODE,
  createSubscriptPlugin,
  MARK_SUBSCRIPT,
  createSuperscriptPlugin,
  MARK_SUPERSCRIPT
} from "@udecode/plate-basic-marks"
import {createKbdPlugin, MARK_KBD} from "@udecode/plate-kbd"
import {createAlignPlugin} from "@udecode/plate-alignment"
import {createAutoformatPlugin} from "@udecode/plate-autoformat"
import {createBlockSelectionPlugin} from "@udecode/plate-selection"
import {createComboboxPlugin} from "@udecode/plate-combobox"
import {createDndPlugin} from "@udecode/plate-dnd"
import {createExitBreakPlugin, createSoftBreakPlugin} from "@udecode/plate-break"
import {createNodeIdPlugin} from "@udecode/plate-node-id"
import {createResetNodePlugin} from "@udecode/plate-reset-node"
import {createDeletePlugin} from "@udecode/plate-select"

import {BlockquoteElement} from "../plate-ui/BlockquoteElement.jsx"
import {CodeBlockElement} from "../plate-ui/CodeBlockElement.jsx"
import {CodeLineElement} from "../plate-ui/CodeLineElement.jsx"
import {CodeSyntaxLeaf} from "../plate-ui/CodeSyntaxLeaf.jsx"
import {LinkElement} from "../plate-ui/LinkElement.jsx"
import {LinkFloatingToolbar} from "../plate-ui/LinkFloatingToolbar.jsx"
import {HeadingElement} from "../plate-ui/HeadingElement.jsx"
import {ParagraphElement} from "../plate-ui/ParagraphElement.jsx"
import {CodeLeaf} from "../plate-ui/CodeLeaf.jsx"
import {KbdLeaf} from "../plate-ui/KbdLeaf.jsx"
import {withPlaceholders} from "../plate-ui/Placeholder.jsx"
import {withDraggables} from "../plate-ui/withDraggables.jsx"

export const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable
    }),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH
            // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
          ]
        }
      }
    }),
    createAutoformatPlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/autoformat
        ],
        enableUndoOnDelete: true
      }
    }),
    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0
        }
      }
    }),
    createComboboxPlugin(),
    createDndPlugin({
      options: {enableScroller: true}
    }),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "mod+enter"
          },
          {
            hotkey: "mod+shift+enter",
            before: true
          },
          {
            hotkey: "enter",
            query: {
              start: true,
              end: true
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1
          }
        ]
      }
    }),
    createNodeIdPlugin({
      options: {
        idCreator: () => crypto.randomUUID()
      }
    }),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ]
      }
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          {hotkey: "shift+enter"},
          {
            hotkey: "enter",
            query: {
              allow: [
                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
              ]
            }
          }
        ]
      }
    })
  ],
  {
    components: withDraggables(withPlaceholders({
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_H1]: withProps(HeadingElement, {variant: "h1"}),
      [ELEMENT_H2]: withProps(HeadingElement, {variant: "h2"}),
      [ELEMENT_H3]: withProps(HeadingElement, {variant: "h3"}),
      [ELEMENT_H4]: withProps(HeadingElement, {variant: "h4"}),
      [ELEMENT_H5]: withProps(HeadingElement, {variant: "h5"}),
      [ELEMENT_H6]: withProps(HeadingElement, {variant: "h6"}),
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [MARK_BOLD]: withProps(PlateLeaf, {as: "strong"}),
      [MARK_CODE]: CodeLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, {as: "em"}),
      [MARK_KBD]: KbdLeaf,
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, {as: "s"}),
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, {as: "sub"}),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, {as: "sup"}),
      [MARK_UNDERLINE]: withProps(PlateLeaf, {as: "u"})
    }))
  }
)
