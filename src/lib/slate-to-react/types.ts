/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import type {ReactNode, ReactElement} from "react"
import {Text, Element} from "slate"

export interface ElementNode<T extends string = string> extends Element {
  type: T
  children: Node[]
}

export type Node = Text | ElementNode

export type GetNodeType<N extends Node> =
  N extends Text
    ? "text"
    : N extends ElementNode
      ? N["type"]
      : never

interface Context<N extends Node> {
  type: GetNodeType<N>
  key: string
  node: N
  children: GetNodeType<N> extends "text" ? string : ReactNode
}

export interface NodeTransform<N extends Node = ElementNode> {
  (ctx: Context<N>): ReactElement<any, any>
}

export type Transform<N extends Node = ElementNode> = [
  type: GetNodeType<N>,
  transform: NodeTransform<N>
]
