import type {KeyboardEventHandler} from "react"
import {useEvent} from "react-use-event-hook"
import {Slot} from "@radix-ui/react-slot"
import {forwardRef} from "react"
import {cn} from "@udecode/cn"

import {Textarea} from "../ui/Textarea.jsx"
import type {TextareaProps, TextareaRef} from "../ui/Textarea.jsx"

export interface PostEditorTitleProps extends TextareaProps {
  asChild?: boolean
}

export type PostEditorTitleRef = TextareaRef

export const PostEditorTitle = forwardRef<
  PostEditorTitleRef,
  PostEditorTitleProps
>(
  (
    {
      asChild,
      rows = 1,
      minRows = 1,
      maxRows = 2,
      maxLength = 255,
      className,

      ...props
    },

    ref
  ) => {
    const Element = asChild ? Slot : Textarea

    // This prevents from inserting `\r\n` symbols to keep title a one-line
    const preventReturn = useEvent<KeyboardEventHandler>(event => {
      if (event.key.toLowerCase() === "enter") {
        return event.preventDefault()
      }
    })

    return (
      <Element
        {...props}
        ref={ref}
        rows={rows}
        minRows={minRows}
        maxRows={maxRows}
        maxLength={maxLength}
        onKeyDown={preventReturn}
        className={cn("resize-none", className)}
      />
    )
  }
)
