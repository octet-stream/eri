import {cva} from "class-variance-authority"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

export type BlockquoteRef = ComponentRef<"blockquote">

export type BlockquoteProps = ComponentProps<"blockquote">

export const blockquoteVariants = cva("my-1 border-l-2 pl-6 italic")

/**
 * Styled `<blockquote>` component
 */
export const Blockquote: FC<BlockquoteProps> = ({
  className,
  children,
  ...props
}) => (
  <blockquote {...props} className={cn(blockquoteVariants(), className)}>
    {children}
  </blockquote>
)

Blockquote.displayName = "Blockquote"
