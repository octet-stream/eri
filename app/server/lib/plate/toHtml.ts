import type {PlateEditor} from "@udecode/plate-common/react"
import {renderToStaticMarkup} from "react-dom/server"
import {createElement} from "react"

import {PlateView} from "../../../lib/plate/PlateView.jsx"

/**
 * Renders the content of given Plate `editor` to HTML string using [`renderToStaticMarkup`](https://react.dev/reference/react-dom/server/renderToStaticMarkup) function.
 *
 * @param editor - Plate editor to render into html
 */
export const toHtml = (editor: PlateEditor) =>
  renderToStaticMarkup(createElement(PlateView, {editor}))
