import {withReact, Slate, Editable} from "slate-react"
import {createEditor} from "slate"
import {useMemo} from "react"

import t from "prop-types"

import {container} from "./text.module.css"

function Text({onChange, value}) {
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable className={container} />
    </Slate>
  )
}

Text.propTypes = {
  onChange: t.func.isRequired,
  value: t.arrayOf(t.shape({})).isRequired
}

export default Text