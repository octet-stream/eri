import type {Editor} from "@tiptap/core"
import {createContext, use} from "react"

import type {MaybeNull} from "../../lib/types/MaybeNull.js"

export const EditorContext = createContext<MaybeNull<Editor>>(null)

export function useEditorContext(): Editor {
  const editor = use(EditorContext)

  if (!editor) {
    throw new Error(
      "Unable to find editor. You should use the hook within EditorContext."
    )
  }

  return editor
}
