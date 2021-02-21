import {forwardRef, ComponentPropsWithoutRef} from "react"

import cn from "classnames"

import s from "./button.module.css"

type ButtonVariants = "primary" | "secondary"

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariants
}

const variants = {primary: s.pimary, secondary: s.secondary}

const getVariant = (name: ButtonVariants) => variants[name] || s.primary

/**
 * @typedef {Object} ButtonProps
 *
 * @prop {ButtonVariants} [variant = "primary"]
 */

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, ...props}, ref) => (
    <button
      {...props}
      className={cn(s.container, getVariant(variant), className)}
      ref={ref}
    />
  )
)

Button.defaultProps = {
  className: null,
  variant: "primary"
}

export default Button
