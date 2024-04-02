import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

import {cn} from "../../lib/utils.js"

export type LinkRef = ElementRef<"a">

export type LinkProps = ComponentPropsWithoutRef<"a">

export const Link = forwardRef<LinkRef, LinkProps>(
  ({className, children, ...props}, ref) => (
    <a
      {...props}

      ref={ref}
      className={cn("font-medium text-primary underline decoration-primary underline-offset-4", className)}
    >
      {children}
    </a>
  )
)
