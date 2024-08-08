import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"
import {cn} from "@udecode/cn"

export type ParagraphRef = ElementRef<"p">

export type ParagraphProps = ComponentPropsWithoutRef<"p">

/**
 * Styled `<p>` component
 */
export const Paragraph = forwardRef<ParagraphRef, ParagraphProps>(
  ({className, children, ...props}, ref) => (
    <p {...props} ref={ref} className={cn("leading-7", className)}>
      {children}
    </p>
  )
)

Paragraph.displayName = "Paragraph"
