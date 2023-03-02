import {createElement} from "react"
import type {FC} from "react"

import type {TRenderElementProps} from "@udecode/plate-core"
import {createHeading} from "component/Heading/createHeading"

import type {THeadingTypes} from "server/trpc/type/common/EditorData"
import type {Value} from "lib/type/Editor"

interface Props extends TRenderElementProps<Value> { }

export const createHeadingElement = (type: THeadingTypes) => {
  const element = createHeading(type)

  const HeadingElement: FC<Props> = ({
    attributes,
    children
  }) => createElement(element, attributes, children)

  return HeadingElement
}
