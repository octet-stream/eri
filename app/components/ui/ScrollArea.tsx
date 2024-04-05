import type {ElementRef, ComponentPropsWithoutRef} from "react"
import {forwardRef} from "react"
import {
  Root,
  Viewport,
  ScrollAreaScrollbar,
  Corner,
  ScrollAreaThumb
} from "@radix-ui/react-scroll-area"

import {cn} from "@udecode/cn"

export const ScrollArea = forwardRef<
ElementRef<typeof Root>,
ComponentPropsWithoutRef<typeof Root>
>(({className, children, ...props}, ref) => (
  <Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </Viewport>
    <ScrollBar />
    <Corner />
  </Root>
))

ScrollArea.displayName = Root.displayName

export const ScrollBar = forwardRef<
ElementRef<typeof ScrollAreaScrollbar>,
ComponentPropsWithoutRef<typeof ScrollAreaScrollbar>
>(({className, orientation = "vertical", ...props}, ref) => (
  <ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical"
        && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal"
        && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaScrollbar.displayName
