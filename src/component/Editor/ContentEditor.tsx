import {memo, ComponentProps} from "react"
import {Plate} from "@udecode/plate"

// TODO: Remove
import type EditorJS from "@editorjs/editorjs"

import type {Value} from "lib/type/Editor"

import {plugins} from "./plugins"

/**
 * @deprecated We're moving to Slate, so the API will be changes soon
 */
export interface OnContentEditorReadyHandler {
  (instance: EditorJS): void
}

interface Props {
  value?: Value
}

// eslint-disable-next-line react/prop-types
export const ContentEditor = memo<Props>(({value}) => (
  <Plate<Value>
    editableProps={{
      placeholder: "Write your thoughts here",
      className: "h-full"
    }}
    plugins={plugins}
    value={value}
    onChange={v => console.log(v)}
  />
))

export type ContentProps = ComponentProps<typeof ContentEditor>
