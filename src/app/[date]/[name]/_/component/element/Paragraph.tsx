import {isParagraph, createElementTransform} from "slate-to-react"

import cn from "clsx"

import {getAlignentClass} from "server/lib/util/getAlignentClass"

export const Paragraph = createElementTransform(
  isParagraph,

  ({element, attributes, children}) => (
    <p {...attributes} className={cn("m-0 py-1", getAlignentClass(element.align))}>
      {children}
    </p>
  )
)
