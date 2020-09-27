import {createElement} from "react"

/**
 * @type {Array<[name: string, componnet: React.ReactNode]>}
 */
const leaves = [
  ["bold", "strong"],
  ["italic", "em"],
  ["underline", "u"],
  ["strikeThrough", "strike"]
]

const pick = (leaf, children) => leaves
  .filter(([name]) => leaf[name] === true)
  .map(([, component]) => component)
  .reduce((prev, curr) => createElement(curr, null, prev), children)

/**
 * @param {import("slate-react").RenderLeafProps} props
 */
const renderLeaf = ({leaf, attributes, children}) => (
  <span {...attributes}>{pick(leaf, children)}</span>
)

export default renderLeaf
