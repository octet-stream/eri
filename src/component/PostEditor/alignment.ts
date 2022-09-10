import {
  setAlign,
  createAlignPlugin,

  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate"
import type {AnyObject, Alignment} from "@udecode/plate"

import type {Value, Editor} from "lib/type/Editor"

const setAlignSafe = (
  event: unknown,
  editor: Editor,
  value: Alignment
): void => {
  const e = event as KeyboardEvent
  e.preventDefault()
  e.stopPropagation()
  setAlign(editor, {value})
}

export const alignment = () => createAlignPlugin<AnyObject, Value, Editor>({
  inject: {
    props: {
      validTypes: [ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_PARAGRAPH]
    }
  },
  handlers: {
    onKeyDown: editor => e => {
      // TODO: Crossplatform shortcuts support
      if (!(e.metaKey && e.shiftKey)) {
        return undefined
      }

      const key = e.key.toLowerCase()

      switch (key) {
      case "l":
        setAlignSafe(e, editor, "left")
        break
      case "e":
        setAlignSafe(e, editor, "center")
        break
      case "r":
        setAlignSafe(e, editor, "right")
        break
      case "u":
        setAlignSafe(e, editor, "justify")
        break
      default:
        return undefined
      }
    }
  }
})
