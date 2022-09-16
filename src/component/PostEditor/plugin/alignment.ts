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

export const ALIGN_LEFT_HOTKEY = "mod+shift+l"

export const ALIGN_CENTER_HOTKEY = "mod+shift+e"

export const ALIGN_RIGHT_HOTKEY = "mod+shift+r"

export const ALIGN_JUSTIFY_HOTKEY = "mod+shift+j"

export const alignment = () => createAlignPlugin<AnyObject, Value, Editor>({
  inject: {
    props: {
      validTypes: [ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_PARAGRAPH]
    }
  },
  handlers: {
    onKeyDown: editor => event => {
      switch (true) {
      case isHotkey(ALIGN_LEFT_HOTKEY, event):
        setAlignSafe(event, editor, "left")
        break
      case isHotkey(ALIGN_CENTER_HOTKEY, event):
        setAlignSafe(event, editor, "center")
        break
      case isHotkey(ALIGN_RIGHT_HOTKEY, event):
        setAlignSafe(event, editor, "right")
        break
      case isHotkey(ALIGN_JUSTIFY_HOTKEY, event):
        setAlignSafe(event, editor, "justify")
        break
      default:
        return undefined
      }
    }
  }
})
