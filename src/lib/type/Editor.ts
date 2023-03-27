import type {
  PlateEditor,
  PlatePlugin,
  PluginOptions
} from "@udecode/plate"

import type {OEditorData} from "server/trpc/type/common/EditorData"

export type Value = OEditorData

export interface Editor extends PlateEditor<Value> {
  isDragging?: boolean
}

export type Plugin<P = PluginOptions> = PlatePlugin<P, Value, Editor>
