import t from "prop-types"
import cn from "classnames"

import forwardRef from "lib/hoc/forwardRef"

import {container, primary, secondary} from "./button.module.css"

const variants = {primary, secondary}

const getVariant = name => variants[name] || primary

const Button = ({className, variant, forwardedRef, ...props}) => (
  <button
    {...props}

    className={cn(container, getVariant(variant), className)}
    ref={forwardedRef}
  />
)

Button.propTypes = {
  ...forwardRef.propTypes,

  className: t.string,
  variant: t.oneOf(["primary", "secondary"])
}

Button.defaultProps = {
  ...forwardRef.defaultProps,

  className: null,
  variant: "primary"
}

export default Button |> forwardRef
