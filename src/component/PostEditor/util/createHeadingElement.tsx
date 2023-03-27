import {createElement} from "react"
import type {FC} from "react"

import type {PlateRenderElementProps} from "@udecode/plate-core"
import {createHeading} from "component/Heading/createHeading"

import type {OHeadingTypes} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends PlateRenderElementProps<Value> { }

export const createHeadingElement = (type: OHeadingTypes) => {
  const element = createHeading(type)

  const HeadingElement: FC<Props> = ({
    attributes,
    children
  }) => createElement(element, attributes, children)

  return HeadingElement
}
