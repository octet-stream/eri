import {createLeafNodeMatcher, createLeafTransform, LeafTransform} from "slate-to-react"
import {createElement, ReactNode, FC, type ReactElement} from "react"

import {OAnyText} from "../../../server/zod/plate/common/AnyText.js"

import {Code} from "../../common/Code.jsx"
import {Kbd} from "../../common/Kbd.jsx"

type TextProps = Parameters<LeafTransform["transform"]>[0]

type Nodes = Array<FC<any> | string>

const combineMarks = (
  nodes: Nodes,

  {key, attributes, children}: TextProps
) => nodes.reduce<ReactNode>(
  (prev, next, index, {length}) => createElement(
    next,

    index + 1 === length ? {...attributes, key} : null,

    prev
  ),

  children
) as ReactElement

export const isAnyText = createLeafNodeMatcher<OAnyText>(
  (node): node is OAnyText => typeof node.text === "string"
)

export const Text = createLeafTransform(
  isAnyText,

  ({leaf, ...props}) => {
    const nodes: Nodes = ["span"]

    if (leaf.text === "") {
      return combineMarks(nodes, {...props, leaf})
    }

    if ("code" in leaf) {
      return combineMarks([...nodes, Code], {...props, leaf})
    }

    if ("kbd" in leaf) {
      return combineMarks([...nodes, Code], {...props, leaf})
    }

    if ("bold" in leaf) {
      nodes.push("strong")
    }

    if ("italic" in leaf) {
      nodes.push("em")
    }

    if ("strikethrough" in leaf) {
      nodes.push("s")
    }

    if ("underline" in leaf) {
      nodes.push("u")
    }

    if ("subscript" in leaf) {
      nodes.push("sub")
    } else if ("superscript" in leaf) {
      nodes.push("sup")
    }

    return combineMarks(nodes, {...props, leaf})
  }
)
