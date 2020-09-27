import {withReact, Slate, Editable} from "slate-react"
import {createEditor} from "slate"
import {useMemo} from "react"

import t from "prop-types"

import {container} from "./text.module.css"

/**
 * @typedef {import("slate").Node} Node
 */

/**
 * @typedef {Object} TextEditorProps
 *
 * @prop {(value: Node[]) => void} onChange
 * @prop {Node[]} value
 */

/**
 * @type {React.FC<TextEditorProps>}
 */
const Text = ({onChange, value}) => {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable className={container} placeholder="Post text" />
    </Slate>
  )
}

Text.propTypes = {
  onChange: t.func.isRequired,
  value: t.arrayOf(t.shape()).isRequired
}

export default Text
