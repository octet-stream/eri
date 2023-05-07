import {isParagraph, createElementTransform} from "slate-to-react"

import cn from "clsx"

import {getAlignentClass} from "server/lib/util/getAlignentClass"

export const Paragraph = createElementTransform(
  isParagraph,

  ({key, element, attributes, children}) => (
    <p
      {...attributes}

      key={key}
      className={cn("m-0 py-1", getAlignentClass(element.align))}
    >
      {children}
    </p>
  )
)
