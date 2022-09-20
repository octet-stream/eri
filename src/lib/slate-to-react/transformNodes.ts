/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// import {createElement} from "react"
import {Element} from "slate"
import {nanoid} from "nanoid"

import type {Transform, NodeTransform, Node} from "./types"
import {
  text,
  link,
  paragraph,
  h2,
  h3,
  h4
} from "./defaultTransforms"

const defaultTransforms: Record<string, NodeTransform> = Object.fromEntries([
  text, link, paragraph, h2, h3, h4
])

function iterateNodes<R extends Node[]>(
  root: R,
  transforms: Map<string, NodeTransform>
): JSX.Element[] {
  const res = []

  for (const node of root) {
    // * This whole function is intended to be used in static pages, so I probably can just use nanoid for keys.
    const key = nanoid()

    if (Element.isElement(node)) { // element node
      const transform = transforms.get(node.type)
        || defaultTransforms[node.type]

      // TODO: Add default transforms
      if (!transform) {
        throw new Error(`Can't find transform for node type: ${node.type}`)
      }

      const element = transform({
        key,
        node,
        type: node.type,
        children: iterateNodes(
          node.children,
          transforms
        )
      })

      res.push(element)
    } else { // text node
      const transform = transforms.get("text") || defaultTransforms.text

      if (!transform) {
        throw new Error("Can't find transform for text node")
      }

      const element = transform({key, node, type: "text", children: node.text})

      res.push(element)
    }
  }

  return res
}

function normalizeTransforms(
  transforms: Transform[]
): Map<string, NodeTransform> {
  const result = new Map<string, NodeTransform>()

  for (const [type, transform] of transforms) {
    if (!result.has(type)) {
      result.set(type, transform)
    }
  }

  return result
}

/**
 * Transforms Slate nodes to React elements
 */
export const transformNodes = <R extends Node[], T extends Transform[]>(
  root: R,
  transforms: T
) => iterateNodes(root, normalizeTransforms(transforms))
