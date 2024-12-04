import {Indicator, Root} from "@radix-ui/react-checkbox"
import {cn} from "@udecode/cn"
import {Check} from "lucide-react"
import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

export type CheckboxRef = ElementRef<typeof Root>

export type CheckboxProps = ComponentPropsWithoutRef<typeof Root>

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  ({className, ...props}, ref) => (
    <Root
      ref={ref}
      className={cn(
        "w-4 h-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check size={14} />
      </Indicator>
    </Root>
  )
)

Checkbox.displayName = Root.displayName
