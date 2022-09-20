import {
  ELEMENT_PARAGRAPH,
  ELEMENT_LINK,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4
} from "@udecode/plate"
import {infer as Infer} from "zod"
import type {ReactNode} from "react"

import {Link, RichText} from "server/trpc/type/common/EditorData"
import {Anchor} from "component/Anchor"

import {createNodeTransform} from "./createNodeTransform"

export const text = createNodeTransform("text", ({key, node, children}) => {
  const n = (node as Infer<typeof RichText>)
  let element: ReactNode = children

  if (n.bold) {
    element = <strong>{element}</strong>
  }

  if (n.italic) {
    element = <i>{element}</i>
  }

  if (n.underline) {
    element = <u>{element}</u>
  }

  if (n.strikethrough) {
    element = <s>{element}</s>
  }

  if (n.superscript) {
    element = <sup>{element}</sup>
  } else if (n.subscript) {
    element = <sub>{element}</sub>
  }

  return <span key={key}>{element}</span>
})

export const paragraph = createNodeTransform(
  ELEMENT_PARAGRAPH,

  ({key, children}) => <p key={key} className="m-0 py-1">{children}</p>
)

export const h2 = createNodeTransform(
  ELEMENT_H2,

  ({key, children}) => (
    <h2 key={key} className="mx-0 mt-[1.4em] mb-0 text-2xl font-medium">
      {children}
    </h2>
  )
)

export const h3 = createNodeTransform(
  ELEMENT_H3,

  ({key, children}) => (
    <h3 key={key} className="mx-0 mt-[1.4em] mb-0 text-xl font-medium">
      {children}
    </h3>
  )
)

export const h4 = createNodeTransform(
  ELEMENT_H4,

  ({key, children}) => (
    <h4 key={key} className="mx-0 mt-3 mb-0 text-lg font-medium">
      {children}
    </h4>
  )
)

export const link = createNodeTransform(
  ELEMENT_LINK,

  ({key, node, children}) => (
    <Anchor key={key} href={(node as Infer<typeof Link>).url} className="text-[#0078d4] no-underline hover:underline">
      {children}
    </Anchor>
  )
)
