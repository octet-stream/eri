import type {ElementRef, ComponentPropsWithoutRef} from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {Root} from "@radix-ui/react-label"
import {forwardRef} from "react"
import {cn} from "@udecode/cn"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export type LabelRef = ElementRef<typeof Root>

export type LabelProps = ComponentPropsWithoutRef<typeof Root> &
  VariantProps<typeof labelVariants>

export const Label = forwardRef<LabelRef, LabelProps>(
  ({className, ...props}, ref) => (
    <Root {...props} ref={ref} className={cn(labelVariants(), className)} />
  )
)

Label.displayName = Root.displayName
