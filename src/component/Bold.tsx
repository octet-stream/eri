import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

interface Props extends ComponentPropsWithoutRef<"strong"> { }

export const Bold = forwardRef<HTMLElement, Props>(
  ({children, ...p}, ref) => (
    <strong {...p} ref={ref}>
      {children}
    </strong>
  )
)
