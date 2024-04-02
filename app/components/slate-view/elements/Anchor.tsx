import {isLink, createElementTransform} from "slate-to-react"

import {Link} from "../../common/Link.jsx"

export const Anchor = createElementTransform(
  isLink,

  ({key, attributes, element, children}) => (
    <Link {...attributes} key={key} href={element.url}>
      {children}
    </Link>
  )
)
