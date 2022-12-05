import {forwardRef, createElement} from "react"
import type {ComponentRef} from "react"

import type {TRenderLeafProps} from "@udecode/plate-core"
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_SUPERSCRIPT,
  MARK_SUBSCRIPT
} from "@udecode/plate-headless"

import {IEditorData} from "server/trpc/type/common/EditorData"

const MARKS_TO_ELEMENTS = {
  [MARK_BOLD]: "strong",
  [MARK_ITALIC]: "i",
  [MARK_UNDERLINE]: "u",
  [MARK_STRIKETHROUGH]: "s",
  [MARK_SUPERSCRIPT]: "sup",
  [MARK_SUBSCRIPT]: "sub"
} as const

type MarksElements = typeof MARKS_TO_ELEMENTS

type BasicMarks = keyof MarksElements

interface Props extends TRenderLeafProps<IEditorData> { }

export const createBasicMarkComponent = <T extends BasicMarks>(
  mark: T
) => {
  const element = MARKS_TO_ELEMENTS[mark]

  return forwardRef<ComponentRef<MarksElements[T]>, Props>(
    ({children, attributes}, ref) => createElement(
      element,

      {
        ...attributes, ref
      },

      children
    )
  )
}
