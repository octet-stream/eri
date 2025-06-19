import type {ComponentProps, ComponentRef, FC} from "react"
import AutosizableTextarea from "react-textarea-autosize"

import {cn} from "../../lib/utils/cn.js"

export type TextareaProps = ComponentProps<typeof AutosizableTextarea>

export const Textarea: FC<TextareaProps> = ({className, ...props}) => (
  <AutosizableTextarea
    {...props}
    className={cn(
      "flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",

      className
    )}
  />
)

export type TextareaRef = ComponentRef<typeof Textarea>
