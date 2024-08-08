import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import type {
  ComponentType,
  ElementRef,
  ComponentPropsWithoutRef,
  ReactNode
} from "react"
import {forwardRef, useState, useEffect} from "react"
import {withCn, withProps} from "@udecode/cn"

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger
export const TooltipPortal = TooltipPrimitive.Portal

export const TooltipContent = withCn(
  withProps(TooltipPrimitive.Content, {
    sideOffset: 4
  }),
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
)

export function withTooltip<
  T extends ComponentType<any> | keyof HTMLElementTagNameMap
>(Component: T) {
  return forwardRef<
    ElementRef<T>,
    ComponentPropsWithoutRef<T> & {
      tooltip?: ReactNode
      tooltipContentProps?: Omit<
        ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
        "children"
      >
      tooltipProps?: Omit<
        ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
        "children"
      >
    }
  >(({tooltip, tooltipContentProps, tooltipProps, ...props}, ref) => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    const component = <Component ref={ref} {...(props as any)} />

    if (tooltip && mounted) {
      return (
        <Tooltip {...tooltipProps}>
          <TooltipTrigger asChild>{component}</TooltipTrigger>

          <TooltipPortal>
            <TooltipContent {...tooltipContentProps}>{tooltip}</TooltipContent>
          </TooltipPortal>
        </Tooltip>
      )
    }

    return component
  })
}
