import {Root} from "@radix-ui/react-separator"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "@udecode/cn"

export type SeparatorProps = ComponentProps<typeof Root>

export const Separator: FC<SeparatorProps> = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) => (
  <Root
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
)

export type SeparatorRef = ComponentRef<typeof Separator>
