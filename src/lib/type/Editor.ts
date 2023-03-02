import type {
  PlateEditor,
  PlatePlugin,
  PluginOptions
} from "@udecode/plate"

import type {TEditorData} from "server/trpc/type/common/EditorData"

export type Value = TEditorData

export interface Editor extends PlateEditor<Value> {
  isDragging?: boolean
}

export type Plugin<P = PluginOptions> = PlatePlugin<P, Value, Editor>
