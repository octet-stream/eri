import {
  ELEMENT_PARAGRAPH,
  ELEMENT_LINK,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_BLOCKQUOTE
} from "@udecode/plate-headless"
import type {ReactNode} from "react"

import type {
  ILink,
  IRichText,
  IParagraph,
  IHeadingElement,
  IBlockquote
} from "server/trpc/type/common/EditorData"
import {Anchor} from "component/Anchor"

import {createNodeTransform} from "./createNodeTransform"

export const text = createNodeTransform<IRichText>(
  "text",

  ({key, node, children}) => {
    // Render <br /> for empty text blocks as it's probably just an empty line
    let element: ReactNode = children || <br />

    if (node.bold) {
      element = <strong>{element}</strong>
    }

    if (node.italic) {
      element = <i>{element}</i>
    }

    if (node.underline) {
      element = <u>{element}</u>
    }

    if (node.strikethrough) {
      element = <s>{element}</s>
    }

    if (node.superscript) {
      element = <sup>{element}</sup>
    } else if (node.subscript) {
      element = <sub>{element}</sub>
    }

    return <span key={key}>{element}</span>
  }
)

export const paragraph = createNodeTransform<IParagraph>(
  ELEMENT_PARAGRAPH,

  ({key, node, children}) => (
    <p key={key} className="m-0 py-1" style={{textAlign: node.align}}>
      {children}
    </p>
  )
)

export const h2 = createNodeTransform<IHeadingElement>(
  ELEMENT_H2,

  ({key, node, children}) => (
    <h2
      key={key}
      className="mx-0 mt-[1.4em] mb-0 text-2xl font-medium"
      style={{textAlign: node.align}}
    >
      {children}
    </h2>
  )
)

export const h3 = createNodeTransform<IHeadingElement>(
  ELEMENT_H3,

  ({key, node, children}) => (
    <h3
      key={key}
      className="mx-0 mt-[1.4em] mb-0 text-xl font-medium"
      style={{textAlign: node.align}}
    >
      {children}
    </h3>
  )
)

export const h4 = createNodeTransform<IHeadingElement>(
  ELEMENT_H4,

  ({key, node, children}) => (
    <h4
      key={key}
      className="mx-0 mt-3 mb-0 text-lg font-medium"
      style={{textAlign: node.align}}
    >
      {children}
    </h4>
  )
)

export const link = createNodeTransform<ILink>(
  ELEMENT_LINK,

  ({key, node, children}) => (
    <Anchor key={key} href={node.url} className="text-[#0078d4] no-underline hover:underline">
      {children}
    </Anchor>
  )
)

export const blockquote = createNodeTransform<IBlockquote>(
  ELEMENT_BLOCKQUOTE,

  ({key, children}) => (
    <blockquote key={key}>
      {children}
    </blockquote>
  )
)
