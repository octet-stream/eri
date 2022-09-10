import {
  setAlign,
  createAlignPlugin,

  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_PARAGRAPH,
  KEY_ALIGN
} from "@udecode/plate"
import type {AnyObject, Alignment, KeyboardHandler} from "@udecode/plate"
import {isHotkey} from "is-hotkey"

import type {Value, Editor} from "lib/type/Editor"

const setAlignSafe = (
  event: Parameters<ReturnType<KeyboardHandler>>[0],
  editor: Editor,
  value: Alignment
): void => {
  event.preventDefault()
  setAlign(editor, {value, key: KEY_ALIGN})
}

export const alignment = () => createAlignPlugin<AnyObject, Value, Editor>({
  inject: {
    props: {
      validTypes: [ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_PARAGRAPH]
    }
  },
  handlers: {
    onKeyDown: editor => event => {
      switch (true) {
      case isHotkey("mod+shift+f", event):
        setAlignSafe(event, editor, "left")
        break
      case isHotkey("mod+shift+e", event):
        setAlignSafe(event, editor, "center")
        break
      case isHotkey("mod+shift+r", event):
        setAlignSafe(event, editor, "right")
        break
      case isHotkey("mod+shift+j", event):
        setAlignSafe(event, editor, "justify")
        break
      default:
        return undefined
      }
    }
  }
})
