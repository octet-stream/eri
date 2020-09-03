import t from "prop-types"

import {container, content} from "./editor.module.css"

const Editor = ({children}) => (
  <div className={container}>
    <div className={content}>{children}</div>
  </div>
)

Editor.propTypes = {
  children: t.node.isRequired
}

export default Editor
