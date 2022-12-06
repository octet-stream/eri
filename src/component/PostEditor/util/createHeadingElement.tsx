import {createElement} from "react"
import type {FC} from "react"

import type {TRenderElementProps} from "@udecode/plate-core"
import {createHeading} from "component/Heading/createHeading"

import type {
  IEditorData,
  IHeadingTypes
} from "server/trpc/type/common/EditorData"

interface Props extends TRenderElementProps<IEditorData> { }

export const createHeadingElement = (type: IHeadingTypes) => {
  const element = createHeading(type)

  const HeadingElement: FC<Props> = ({
    attributes,
    children
  }) => createElement(element, attributes, children)

  return HeadingElement
}
