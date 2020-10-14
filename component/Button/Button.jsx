import {forwardRef} from "react"

import cn from "classnames"

import {container, primary, secondary} from "./button.module.css"

const variants = {primary, secondary}

/**
 * @typedef {"primary" | "secondary"} ButtonVariants
 */

/**
 * @param {ButtonVariants} name
 */
const getVariant = name => variants[name] || primary

/**
 * @typedef {Object} ButtonProps
 *
 * @prop {ButtonVariants} [variant = "primary"]
 */

/**
 * @type {React.FC<React.HTMLAttributes<HTMLButtonElement> & ButtonProps>}
 */
const Button = forwardRef(({className, variant, ...props}, ref) => (
  <button
    {...props}
    className={cn(container, getVariant(variant), className)}
    ref={ref}
  />
))

Button.defaultProps = {
  className: null,
  variant: "primary"
}

export default Button
