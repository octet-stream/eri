import {memo, ComponentProps} from "react"
import type {Descendant} from "slate"
import {Plate} from "@udecode/plate"

// TODO: Remove
import type EditorJS from "@editorjs/editorjs"

/**
 * @deprecated We're moving to Slate, so the API will be changes soon
 */
export interface OnContentEditorReadyHandler {
  (instance: EditorJS): void
}

interface Props {
  content?: Descendant[]
}

// eslint-disable-next-line react/prop-types
export const ContentEditor = memo<Props>(() => (
  <Plate
    editableProps={{
      placeholder: "Write your thoughts here",
      className: "h-full"
    }}
  />
))

export type ContentProps = ComponentProps<typeof ContentEditor>
