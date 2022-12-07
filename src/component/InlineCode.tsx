import type {ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"

interface Props extends ComponentPropsWithoutRef<"code"> {}

export const InlineCode = forwardRef<HTMLElement, Props>((props, ref) => (
  <code {...props} ref={ref} />
))
