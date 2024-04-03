import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

import {cn} from "../../lib/utils.js"

export type BlockquoteRef = ElementRef<"blockquote">

export type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">

/**
 * Styled `<blockquote>` component
 */
export const Blockquote = forwardRef<BlockquoteRef, BlockquoteProps>(
  ({className, children, ...props}, ref) => (
    <blockquote
      {...props}

      ref={ref}
      className={cn("my-1 border-l-2 pl-6 italic", className)}
    >
      {children}
    </blockquote>
  )
)
