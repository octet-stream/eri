import {cva} from "class-variance-authority"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.js"

export type LinkRef = ComponentRef<"a">

export type LinkProps = ComponentProps<"a">

export const linkVariants = cva(
  "font-medium text-primary underline decoration-primary underline-offset-4"
)

/**
 * Styled anchor `<a>` element
 */
export const Link: FC<LinkProps> = ({className, children, ...props}) => (
  <a {...props} className={cn(linkVariants(), className)}>
    {children}
  </a>
)

Link.displayName = "Link"
