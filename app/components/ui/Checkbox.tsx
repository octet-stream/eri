import {Indicator, Root} from "@radix-ui/react-checkbox"
import {Check} from "lucide-react"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

export type CheckboxProps = ComponentProps<typeof Root>

export const Checkbox: FC<CheckboxProps> = ({className, ...props}) => (
  <Root
    className={cn(
      "w-4 h-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <Indicator className={cn("flex items-center justify-center text-current")}>
      <Check size={14} />
    </Indicator>
  </Root>
)

export type CheckboxRef = ComponentRef<typeof Checkbox>
