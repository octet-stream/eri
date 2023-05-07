import {isLink, createElementTransform} from "slate-to-react"

import {Anchor} from "component/Anchor"

export const Link = createElementTransform(
  isLink,

  ({key, element, attributes, children}) => (
    <Anchor {...attributes} href={element.url} key={key}>
      {children}
    </Anchor>
  )
)
