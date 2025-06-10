import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport
} from "@radix-ui/react-scroll-area"
import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.js"

export type ScrollAreaProps = ComponentProps<typeof Root>

export const ScrollArea: FC<ScrollAreaProps> = ({
  className,
  children,
  ...props
}) => (
  <Root className={cn("relative overflow-hidden", className)} {...props}>
    <Viewport className="h-full w-full rounded-[inherit]">{children}</Viewport>
    <ScrollBar />
    <Corner />
  </Root>
)

export type ScrollAreaRef = ComponentRef<typeof Root>

export type ScrollBarProps = ComponentProps<typeof ScrollAreaScrollbar>

export const ScrollBar: FC<ScrollBarProps> = ({
  className,
  orientation = "vertical",
  ...props
}) => (
  <ScrollAreaScrollbar
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaScrollbar>
)

export type ScrollBarRef = ComponentRef<typeof ScrollAreaScrollbar>
