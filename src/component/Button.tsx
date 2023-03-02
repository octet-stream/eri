/* eslint-disable react/button-has-type */

import type {ComponentPropsWithoutRef, ReactNode} from "react"
import {forwardRef} from "react"

import cn from "clsx"

type Variants = "primary" | "secondary"

type Colors = "brand" | "red"

interface Props extends ComponentPropsWithoutRef<"button"> {
  wide?: boolean
  color?: Colors
  variant?: Variants
  children?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, Props>((
  {
    children,
    className,
    color,
    variant,
    wide = false,
    type = "button",

    ...props
  },

  ref
) => (
  <button
    {...props}

    ref={ref}
    type={type}
    className={cn(
      "text-center disabled:cursor-not-allowed",
      "py-2 px-6 rounded-md border border-transparent",

      "transition-colors duration-200",

      // Disabled style.
      "disabled:text-black disabled:bg-gray-200 disabled:border-gray-200 dark:disabled:text-white dark:disabled:border-slate-800 disabled:dark:bg-slate-800",

      {
        "w-full": wide,
        "text-white": variant === "primary",
        "bg-transparent": variant === "secondary",

        // Primary
        "bg-violet-600 border-violet-600 active:bg-violet-700 dark:bg-violet-800 dark:border-violet-800 dark:active:bg-violet-900 dark:active:border-violet-900": variant === "primary" && (!color || color === "brand"),
        "bg-red-500 border-red-500 active:bg-red-600 active:border-red-600 dark:bg-red-600 dark:border-red-600 dark:active:bg-red-700 dark:active:border-red-700": variant === "primary" && color === "red",

        // Secondary
        "border-violet-800 text-violet-800 dark:text-white active:bg-violet-50 dark:active:bg-violet-900/30": variant === "secondary" && (!color || color === "brand"),
        "border-red-500 text-red-500 active:bg-red-50 dark:text-white dark:border-red-600 dark:active:bg-red-700/40": variant === "secondary" && color === "red"
      },

      className
    )}
  >
    {children}
  </button>
))
