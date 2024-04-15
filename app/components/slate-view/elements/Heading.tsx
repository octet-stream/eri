import {isHeading, createElementTransform} from "slate-to-react"

import {Heading as CommonHeading} from "../../common/Heading.jsx"

import {Alignment} from "./Alignment.jsx"

export const Heading = createElementTransform(
  isHeading,

  ({key, element, attributes, children}) => (
    <Alignment asChild key={key} align={element.align}>
      <CommonHeading {...attributes} variant={element.type}>
        {children}
      </CommonHeading>
    </Alignment>
  )
)
