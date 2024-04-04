import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

import {cn} from "../../lib/utils.js"

export type KbdRef = ElementRef<"kbd">

export type KbfProps = ComponentPropsWithoutRef<"kbd">

/**
 * Styled keyboard input `<kbd>` element
 */
export const Kbd = forwardRef<KbdRef, KbfProps>(
  ({className, children, ...props}, ref) => (
    <kbd {...props} ref={ref} className={cn("rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-sm shadow-[rgba(255,_255,_255,_0.1)_0px_0.5px_0px_0px_inset,_rgb(248,_249,_250)_0px_1px_5px_0px_inset,_rgb(193,_200,_205)_0px_0px_0px_0.5px,_rgb(193,_200,_205)_0px_2px_1px_-1px,_rgb(193,_200,_205)_0px_1px_0px_0px] dark:shadow-[rgba(255,_255,_255,_0.1)_0px_0.5px_0px_0px_inset,_rgb(26,_29,_30)_0px_1px_5px_0px_inset,_rgb(76,_81,_85)_0px_0px_0px_0.5px,_rgb(76,_81,_85)_0px_2px_1px_-1px,_rgb(76,_81,_85)_0px_1px_0px_0px]", className)}>
      {children}
    </kbd>
  )
)
