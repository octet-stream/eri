import t from "prop-types"
import cn from "classnames"

import forwardRef from "lib/hoc/forwardRef"

import {container} from "./input.module.css"

/**
 * @type {React.FunctionComponent<{className?: string}>}
 */
const Input = ({className, forwardedRef, ...props}) => (
  <input
    {...props}
    className={cn(container, className)}
    ref={forwardedRef}
  />
)

Input.propTypes = {
  ...forwardRef.propTypes,

  className: t.string
}

Input.defaultProps = {
  ...forwardRef.defaultProps,

  className: null
}

export default Input |> forwardRef
