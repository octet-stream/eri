import type {ComponentProps, FC} from "react"

import {cn} from "../../lib/utils/cn.js"

export interface ToolbarButtonProps extends ComponentProps<"button"> {
  active?: boolean
}

export const ToolbarButton: FC<ToolbarButtonProps> = ({
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
