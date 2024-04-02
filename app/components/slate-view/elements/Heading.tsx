import {isHeading, createElementTransform} from "slate-to-react"

import {Heading as CommonHeading} from "../../common/Heading.jsx"

export const Heading = createElementTransform(
  isHeading,

  ({key, element, attributes, children}) => (
    <CommonHeading {...attributes} key={key} variant={element.type}>
      {children}
    </CommonHeading>
  )
)
