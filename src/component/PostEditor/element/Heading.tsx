import type {TRenderElementProps} from "@udecode/plate-core"
import {createElement} from "react"
import type {FC} from "react"

import type {IHeadingElement} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends TRenderElementProps<Value, IHeadingElement> { }

export const Heading: FC<Props> = ({
  attributes,
  element,
  children
}) => createElement(
  element.type,

  {
    ...attributes,

    style: {
      textAlign: element.align
    }
  },

  children
)
