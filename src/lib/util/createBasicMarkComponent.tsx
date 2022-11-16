import type {ComponentPropsWithoutRef, ComponentRef} from "react"
import {forwardRef, createElement} from "react"

// import type {TRenderLeafProps} from "@udecode/plate-core"
import {
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_SUPERSCRIPT,
  MARK_SUBSCRIPT
} from "@udecode/plate-headless"

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

export const createBasicMarkComponent = <T extends BasicMarks>(
  mark: T
) => forwardRef<ComponentRef<MarksElements[T]>, ComponentPropsWithoutRef<"a">>(
  ({children, ...props}, ref) => createElement(
    MARKS_TO_ELEMENTS[mark],

    {
      ...props, ref
    },

    children
  )
)
