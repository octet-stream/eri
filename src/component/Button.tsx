/* eslint-disable react/button-has-type */
import type {ComponentPropsWithoutRef, ReactNode} from "react"
import {forwardRef} from "react"

import cn from "clsx"

interface Props extends ComponentPropsWithoutRef<"button"> {
  wide?: boolean
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, Props>((
  {
    children, className, wide = false, type = "button", ...props
  },

  ref
) => (
  <button
    {...props}

    ref={ref}
    type={type}
    className={cn(
      "bg-black text-white rounded-md p-2 disabled:bg-gray-100 disabled:text-black disabled:cursor-not-allowed",

      className,

      wide ? "w-full" : "px-5"
    )}
  >
    {children}
  </button>
))
