import cn from "classnames"

import {container} from "./actions.module.css"

/**
 * @type {React.FC<{children: React.ReactNode, className?: string}>}
 */
const Actions = (({children, className}) => (
  <div className={cn(container, className)}>
    {children}
  </div>
))

export default Actions
