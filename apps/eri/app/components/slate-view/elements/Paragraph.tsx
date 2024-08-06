import {isParagraph, createElementTransform} from "slate-to-react"

import {Paragraph as P} from "../../common/Paragraph.jsx"
import {Alignment} from "./Alignment.jsx"

export const Paragraph = createElementTransform(
  isParagraph,

  ({element, key, attributes, children}) => (
    <Alignment key={key} align={element.align} asChild>
      <P {...attributes}>{children}</P>
    </Alignment>
  )
)
