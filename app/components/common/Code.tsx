import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

import {cn} from "../../lib/utils/cn.js"

export type CodeRef = ElementRef<"code">

export type CodeProps = ComponentPropsWithoutRef<"code">

/**
 * Styled inline `<code>` element
 */
export const Code = forwardRef<CodeRef, CodeProps>(
  ({className, children, ...props}, ref) => (
    <code
      {...props}
      ref={ref}
      className={cn(
        "whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm",
        className
      )}
    >
      {children}
    </code>
  )
)

Code.displayName = "Code"
