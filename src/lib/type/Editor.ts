import type {
  PlateEditor,
  PlatePlugin,
  PluginOptions,

  TElement,
  TLinkElement,
  TText,

  ELEMENT_LINK,
  ELEMENT_PARAGRAPH,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
} from "@udecode/plate"
import type {CSSProperties} from "react"

export interface PlainText extends TText { }

export interface EmptyText extends PlainText {
  text: ""
}

export interface RichText extends PlainText {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  kbd?: boolean
  subscript?: boolean
  backgroundColor?: CSSProperties["backgroundColor"]
  fontFamily?: CSSProperties["fontFamily"]
  color?: CSSProperties["color"]
  fontSize?: CSSProperties["fontSize"]
  fontWeight?: CSSProperties["fontWeight"]
}

export interface Link extends TLinkElement {
  type: typeof ELEMENT_LINK
  children: RichText[]
}

export type InlineElement =
  | Link

export type InlineDescendant = InlineElement | RichText

export type InlineChildren = InlineDescendant[]

export interface IndentProps {
  indent?: number
}

export interface IndentListProps extends IndentProps {
  listStart?: number
  listRestart?: number
  listStyleType?: string
}

export interface LineHeightProps {
  lineHeight?: CSSProperties["lineHeight"]
}

export interface AlignProps {
  align?: CSSProperties["textAlign"]
}

type BlockElementProps = TElement & IndentListProps & LineHeightProps

export interface BlockElement extends BlockElementProps {
  id?: string
}

export interface Paragraph extends BlockElement {
  type: typeof ELEMENT_PARAGRAPH
  children: InlineChildren
}

type HeadingTypes =
  | typeof ELEMENT_H2
  | typeof ELEMENT_H3
  | typeof ELEMENT_H4

export interface Heading<T extends HeadingTypes> extends BlockElement {
  type: T
  children: InlineChildren
}

export interface H2 extends Heading<"h2"> { }

export interface H3 extends Heading<"h3"> { }

export interface H4 extends Heading<"h4"> { }

export type RootElement =
  | Paragraph
  | H2
  | H3
  | H4

export type Value = RootElement[]

export interface Editor extends PlateEditor<Value> {
  isDragging?: boolean
}

export type Plugin<P = PluginOptions> = PlatePlugin<P, Value>
