/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import type {ReactElement} from "react"
import type {Text} from "slate"
import {nanoid} from "nanoid"
import {Element} from "slate"

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

/**
 * Iterates over given Slate nodes and applies transforms from the list
 */
function iterateNodes<R extends Node[]>(
  root: R,
  transforms: Map<string, Transform>
): ReactElement<any, any>[] {
  const res = []

  for (const node of root) {
    // * This whole function is intended to be used in static pages, so I probably can just use nanoid for keys.
    // ? Maybe keys should be preserved in datanase from `createNodeIdPlugin`. But it does seem to work for initial state and for first paragraph
    const key = nanoid()

    if (Element.isElement(node)) { // element node
      const transform = (
        transforms.get(node.type) || defaultTransforms[node.type]
      ) as unknown as NodeTransform

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
      const transform = (
        transforms.get("text") || defaultTransforms.text
      ) as unknown as NodeTransform<Text>

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
  transforms: Transform[] = []
): Map<string, Transform> {
  const result = new Map<string, Transform>()

  for (const [type, transform] of transforms) {
    if (!result.has(type)) {
      result.set(type, transform as any)
    }
  }

  return result
}

/**
 * Transforms Slate nodes to React elements
 *
 * @param root Slate root element
 * @param transforms Transformation functions
 */
export const transformNodes = <R extends Node[], T extends Transform[]>(
  root: R,
  transforms?: T
) => iterateNodes(root, normalizeTransforms(transforms))
