import {createElement} from "react"

/**
 * @typedef {import("slate-react").RenderLeafProps} RenderLeafProps
 * @typedef {import("slate").Text} Text
 */

/**
 * @type {Array<[name: string, componnet: React.ReactNode]>}
 */
const leaves = [
  ["bold", "strong"],
  ["italic", "em"],
  ["underline", "u"],
  ["strikeThrough", "strike"]
]

/**
 * @param {Text} leaf
 * @param {React.ReactNode} children
 */
const compose = (leaf, children) => leaves
  .filter(([name]) => leaf[name] === true)
  .map(([, component]) => component)
  .reduce((prev, curr) => createElement(curr, null, prev), children)

/**
 * @param {RenderLeafProps} props
 */
const renderLeaf = ({leaf, attributes, children}) => (
  <span {...attributes}>{compose(leaf, children)}</span>
)

export default renderLeaf
