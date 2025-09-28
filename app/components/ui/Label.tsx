import {Root} from "@radix-ui/react-label"
import {cva, type VariantProps} from "class-variance-authority"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export interface LabelProps
  extends ComponentProps<typeof Root>,
    VariantProps<typeof labelVariants> {}

export const Label: FC<LabelProps> = ({className, ref, ...props}) => (
  <Root {...props} ref={ref} className={cn(labelVariants(), className)} />
)

export type LabelRef = ComponentRef<typeof Label>
