import {cn} from "@udecode/cn"
import type {ComponentPropsWithoutRef, ElementRef} from "react"
import {forwardRef} from "react"

import AutosizableTextarea from "react-textarea-autosize"

export type TextareaRef = ElementRef<typeof AutosizableTextarea>

export type TextareaProps = ComponentPropsWithoutRef<typeof AutosizableTextarea>

export const Textarea = forwardRef<TextareaRef, TextareaProps>(
  ({className, ...props}, ref) => (
    <AutosizableTextarea
      {...props}
      ref={ref}
      className={cn(
        "flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",

        className
      )}
    />
  )
)

Textarea.displayName = "Textarea"
