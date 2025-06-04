import {cva} from "class-variance-authority"
import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

import {cn} from "../../lib/utils/cn.js"

export type ParagraphRef = ElementRef<"p">

export type ParagraphProps = ComponentPropsWithoutRef<"p">

export const paragraphVariants = cva("leading-7 [&:not(:first-child)]:mt-6")

/**
 * Styled `<p>` component
 */
export const Paragraph = forwardRef<ParagraphRef, ParagraphProps>(
  ({className, children, ...props}, ref) => (
    <p {...props} ref={ref} className={cn(paragraphVariants(), className)}>
      {children}
    </p>
  )
)

Paragraph.displayName = "Paragraph"
