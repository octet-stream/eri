import type {ElementRef, ComponentPropsWithoutRef} from "react"
import {cva, type VariantProps} from "class-variance-authority"
import {Root} from "@radix-ui/react-label"
import {forwardRef} from "react"

import {cn} from "../../lib/utils.js"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

type Ref = ElementRef<typeof Root>

type Props =
  & ComponentPropsWithoutRef<typeof Root>
  & VariantProps<typeof labelVariants>

export const Label = forwardRef<Ref, Props>(({className, ...props}, ref) => (
  <Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = Root.displayName
