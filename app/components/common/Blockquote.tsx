import {cn} from "@udecode/cn"
import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

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

Blockquote.displayName = "Blockquote"
