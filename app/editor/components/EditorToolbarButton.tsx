import type {ComponentProps, FC} from "react"

import {cn} from "../../lib/utils/cn.ts"

export interface EditorToolbarButtonProps extends ComponentProps<"button"> {
  active?: boolean
}

export const EditorToolbarButton: FC<EditorToolbarButtonProps> = ({
  children,
  className,
  active = false,
  ...props
}) => (
  <button
    type="button"
    className={cn(
      "p-1 rounded-md hover:bg-muted ",

      {
        "bg-accent": active,
        "hover:text-muted-foreground": !active
      },

      className
    )}
    {...props}
  >
    {children}
  </button>
)
