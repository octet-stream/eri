import {cva} from "class-variance-authority"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

export type CodeRef = ComponentRef<"code">

export type CodeProps = ComponentProps<"code">

export const codeVariants = cva(
  "whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm"
)

/**
 * Styled inline `<code>` element
 */
export const Code: FC<CodeProps> = ({className, children, ...props}) => (
  <code {...props} className={cn(codeVariants(), className)}>
    {children}
  </code>
)

Code.displayName = "Code"
