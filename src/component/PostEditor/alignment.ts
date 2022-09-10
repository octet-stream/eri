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

export const ALIGN_SHORTCUT_LEFT = "mod+shift+l"

export const ALIGN_SHORTCUT_CENTER = "mod+shift+e"

export const ALIGN_SHORTCUT_RIGHT = "mod+shift+r"

export const ALIGN_SHORTCUT_JUSTIFY = "mod+shift+j"

export const alignment = () => createAlignPlugin<AnyObject, Value, Editor>({
  inject: {
    props: {
      validTypes: [ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_PARAGRAPH]
    }
  },
  handlers: {
    onKeyDown: editor => event => {
      switch (true) {
      case isHotkey(ALIGN_SHORTCUT_LEFT, event):
        setAlignSafe(event, editor, "left")
        break
      case isHotkey(ALIGN_SHORTCUT_CENTER, event):
        setAlignSafe(event, editor, "center")
        break
      case isHotkey(ALIGN_SHORTCUT_RIGHT, event):
        setAlignSafe(event, editor, "right")
        break
      case isHotkey(ALIGN_SHORTCUT_JUSTIFY, event):
        setAlignSafe(event, editor, "justify")
        break
      default:
        return undefined
      }
    }
  }
})
