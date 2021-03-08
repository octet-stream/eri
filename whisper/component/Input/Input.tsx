import {forwardRef, ComponentPropsWithoutRef} from "react"

import cn from "classnames"

import s from "./input.module.css"

type InputProps = ComponentPropsWithoutRef<"input">

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({className, ...props}, ref) => (
    <input
      {...props}
      className={cn(s.container, className)}
      ref={ref}
    />
  )
)

export default Input
