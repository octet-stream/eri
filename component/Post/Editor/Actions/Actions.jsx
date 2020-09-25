import t from "prop-types"

import {container} from "./actions.module.css"

/**
 * @type {React.FC<{children: React.ReactNode}>}
 */
const Actions = ({children}) => (
  <div className={container}>
    {children}
  </div>
)

Actions.propTypes = {
  children: t.node.isRequired
}

export default Actions
