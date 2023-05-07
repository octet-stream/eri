import {isHeading, createElementTransform} from "slate-to-react"
import {createElement} from "react"

import {getAlignentClass} from "server/lib/util/getAlignentClass"

export const Heading = createElementTransform(
  isHeading,

  ({key, element, attributes, children}) => (
    createElement(
      element.type,

      {
        ...attributes,

        key,

        className: getAlignentClass(element.align)
      },

      children
    )
  )
)
