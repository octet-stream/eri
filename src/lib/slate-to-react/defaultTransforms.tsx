import {
  ELEMENT_PARAGRAPH,
  ELEMENT_LINK,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4
} from "@udecode/plate"
import {infer as Infer} from "zod"

import {Link} from "server/trpc/type/common/EditorData"
import {Anchor} from "component/Anchor"

import {createNodeTransform} from "./createNodeTransform"

export const text = createNodeTransform("text", ({key, children}) => (
  <span key={key}>{children}</span>
))

export const paragraph = createNodeTransform(
  ELEMENT_PARAGRAPH,

  ({key, children}) => <p key={key}>{children}</p>
)

export const h2 = createNodeTransform(
  ELEMENT_H2,

  ({key, children}) => <h2 key={key}>{children}</h2>
)

export const h3 = createNodeTransform(
  ELEMENT_H3,

  ({key, children}) => <h3 key={key}>{children}</h3>
)

export const h4 = createNodeTransform(
  ELEMENT_H4,

  ({key, children}) => <h4 key={key}>{children}</h4>
)

export const link = createNodeTransform(
  ELEMENT_LINK,

  ({key, node, children}) => (
    <Anchor key={key} href={(node as Infer<typeof Link>).url}>
      {children}
    </Anchor>
  )
)
