import {isBlockquote, createElementTransform} from "slate-to-react"

import {Blockquote as CommonBlockquote} from "../../common/Blockquote.jsx"

export const Blockquote = createElementTransform(
  isBlockquote,

  ({key, attributes, children}) => (
    <CommonBlockquote {...attributes} key={key}>
      {children}
    </CommonBlockquote>
  )
)
