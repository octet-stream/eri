/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import type {ReactNode} from "react"
import {Text, Element} from "slate"

export interface ElementNode extends Element {
  type: string
  children: Node[]
}

export type Node = Text | ElementNode

interface Context<T extends string> {
  type: T
  key: string
  node: Node
  children: ReactNode
}

interface TextTransformContext<N extends Text = Text> extends Context<"text"> {
  node: N
  children: string
}

interface NodeTransformContext<T extends string> extends Context<T> {
}

export interface TextTransform {
  (ctx: TextTransformContext): JSX.Element
}

export interface NodeTransform<T extends string = string> {
  (ctx: NodeTransformContext<T>): JSX.Element
}

export type Transform<T extends string = string> = [
  type: T, transform: NodeTransform<T>
]
