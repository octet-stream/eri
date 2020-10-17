import {createElement} from "react"

import AnchorSlate from "component/Anchor/AnhorSlate"

/** @type {Object.<string, React.ReactNode>} */
const elements = {
  paragraph: "p",
  heading_one: "h1",
  heading_two: "h2",
  heading_three: "h3",
  heading_four: "h4",
  heading_five: "h5",
  heading_six: "h6",
  ol_list: "ol",
  ul_list: "ul",
  list_item: "li",
  block_quote: "blockquote",
  code: "code",
  link: AnchorSlate
}

/**
 * @typedef {import("slate-react").RenderElementProps} RenderElementProps
 */

/**
 * @param {RenderElementProps} props
 *
 * @return {JSX.Element}
 */
function renderElement({element: el, children, attributes}) {
  /** @type {React.ReactNode} */
  const element = elements[el.type]

  if (!element) {
    return children
  }

  return createElement(element, attributes, children)
}

export default renderElement
