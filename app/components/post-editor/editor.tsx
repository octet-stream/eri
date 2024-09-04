import {
  createPlateEditor,
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
  type CreatePlateEditorOptions
} from "@udecode/plate-common/react"
import type {AnyPluginConfig, Value} from "@udecode/plate-common"
import {BlockquotePlugin} from "@udecode/plate-block-quote/react"
import {DndPlugin} from "@udecode/plate-dnd"
import {withProps} from "@udecode/cn"
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  CodePlugin,
  SubscriptPlugin,
  SuperscriptPlugin
} from "@udecode/plate-basic-marks/react"
import {AlignPlugin} from "@udecode/plate-alignment"
import {LinkPlugin} from "@udecode/plate-link/react"
// import {AutoformatPlugin} from "@udecode/plate-autoformat"
import {ExitBreakPlugin, SoftBreakPlugin} from "@udecode/plate-break/react"
import {BlockSelectionPlugin} from "@udecode/plate-selection/react"
import {HeadingPlugin} from "@udecode/plate-heading/react"
import {ResetNodePlugin} from "@udecode/plate-reset-node"
import {NodeIdPlugin} from "@udecode/plate-node-id"
import {HEADING_KEYS} from "@udecode/plate-heading"
import {DeletePlugin} from "@udecode/plate-select"
import {KbdPlugin} from "@udecode/plate-kbd"

import {LinkFloatingToolbar} from "../plate-ui/LinkFloatingToolbar.jsx"
import {BlockquoteElement} from "../plate-ui/BlockquoteElement.jsx"
import {ParagraphElement} from "../plate-ui/ParagraphElement.jsx"
import {HeadingElement} from "../plate-ui/HeadingElement.jsx"
import {withDraggables} from "../plate-ui/withDraggables.jsx"
import {CodeLeaf} from "../plate-ui/CodeLeaf.jsx"
import {KbdLeaf} from "../plate-ui/KbdLeaf.jsx"

import {createNodeId} from "../../server/zod/plate/utils/nodeId.js"

export const SHARED_OPTIONS = {
  plugins: [
    // Main plugins
    NodeIdPlugin.configure({
      options: {
        idCreator: createNodeId,
        filterText: false
      }
    }),

    // TODO: Add auto format rules https://platejs.org/docs/autoformat
    // AutoformatPlugin.configure({
    //   options: {
    //     enableUndoOnDelete: true
    //   }
    // }),

    DeletePlugin,
    ResetNodePlugin,
    KbdPlugin,
    BlockSelectionPlugin,
    DndPlugin.configure({
      options: {
        enableScroller: true
      }
    }),
    ExitBreakPlugin.configure({
      options: {
        rules: [
          {
            hotkey: "mod+enter"
          },
          {
            before: true,
            hotkey: "mod+shift+enter"
          },
          {
            hotkey: "enter",
            level: 1,
            query: {
              allow: [HEADING_KEYS.h2, HEADING_KEYS.h3, HEADING_KEYS.h4],
              end: true,
              start: true
            },
            relative: true
          }
        ]
      }
    }),
    SoftBreakPlugin.configure({
      options: {
        rules: [
          {
            hotkey: "shift+enter"
          },
          {
            hotkey: "enter",
            query: {
              allow: ["code_block", "blockquote"]
            }
          }
        ]
      }
    }),

    // Default element
    ParagraphPlugin,

    // Basic marks
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    CodePlugin,
    SubscriptPlugin,
    SuperscriptPlugin,

    // Other elements
    HeadingPlugin.configure({
      options: {
        levels: [2, 3, 4]
      }
    }),
    BlockquotePlugin,
    LinkPlugin.configure({
      render: {
        afterEditable: () => <LinkFloatingToolbar />
      }
    }),
    AlignPlugin.configure({
      inject: {
        targetPlugins: [
          ParagraphPlugin.key,
          HEADING_KEYS.h2,
          HEADING_KEYS.h3,
          HEADING_KEYS.h4
        ]
      }
    })
  ],
  override: {
    components: withDraggables({
      [BlockquotePlugin.key]: BlockquoteElement,
      // [CodeBlockPlugin.key]: CodeBlockElement,
      // [CodeLinePlugin.key]: CodeLineElement,
      // [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
      // [HorizontalRulePlugin.key]: HrElement,
      // [ImagePlugin.key]: ImageElement,
      // [LinkPlugin.key]: LinkElement,
      // [TogglePlugin.key]: ToggleElement,
      [HEADING_KEYS.h2]: withProps(HeadingElement, {variant: "h2"}),
      [HEADING_KEYS.h3]: withProps(HeadingElement, {variant: "h3"}),
      [HEADING_KEYS.h4]: withProps(HeadingElement, {variant: "h4"}),
      [HEADING_KEYS.h5]: withProps(HeadingElement, {variant: "h5"}),
      [HEADING_KEYS.h6]: withProps(HeadingElement, {variant: "h6"}),
      // [MediaEmbedPlugin.key]: MediaEmbedElement,
      [ParagraphPlugin.key]: ParagraphElement,
      // [TodoListPlugin.key]: TodoListElement,
      // [DatePlugin.key]: DateElement,
      [BoldPlugin.key]: withProps(PlateLeaf, {as: "strong"}),
      [CodePlugin.key]: CodeLeaf,
      // [HighlightPlugin.key]: HighlightLeaf,
      [ItalicPlugin.key]: withProps(PlateLeaf, {as: "em"}),
      [KbdPlugin.key]: KbdLeaf,
      [StrikethroughPlugin.key]: withProps(PlateLeaf, {as: "s"}),
      [SubscriptPlugin.key]: withProps(PlateLeaf, {as: "sub"}),
      [SuperscriptPlugin.key]: withProps(PlateLeaf, {as: "sup"}),
      [UnderlinePlugin.key]: withProps(PlateLeaf, {as: "u"})
    })
  }
} satisfies CreatePlateEditorOptions<Value, AnyPluginConfig>

export const createPostContentEditor = <TValue extends Value = Value>(
  value?: TValue
) => createPlateEditor({...SHARED_OPTIONS, value})

export const usePostContentEditor = <TValue extends Value = Value>(
  value?: TValue
) => usePlateEditor({...SHARED_OPTIONS, value})
