import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

interface Props extends ComponentPropsWithoutRef<"i"> { }

export const Italic = forwardRef<HTMLElement, Props>(
  ({children, ...p}, ref) => (
    <i {...p} ref={ref}>
      {children}
    </i>
  )
)
