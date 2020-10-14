import {forwardRef} from "react"

import cn from "classnames"

import {container} from "./input.module.css"

/**
 * @type {React.FC<React.HTMLAttributes<HTMLInputElement>>}
 */
const Input = forwardRef(({className, ...props}, ref) => (
  <input
    {...props}
    className={cn(container, className)}
    ref={ref}
  />
))

export default Input
