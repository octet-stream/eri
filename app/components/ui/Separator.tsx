import {Root} from "@radix-ui/react-separator"
import type {ComponentProps, FC} from "react"

import {cn} from "@udecode/cn"

export type SeparatorProps = ComponentProps<typeof Root>

export const Separator: FC<SeparatorProps> = ({
  className,
  orientation = "horizontal",
  decorative = true,
  ref,
  ...props
}) => (
  <Root
    ref={ref}
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

Separator.displayName = Root.displayName
