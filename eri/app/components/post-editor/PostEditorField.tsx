import type {FC, ReactNode} from "react"
import {cn} from "@udecode/cn"

export interface PostEditorFieldProps {
  children: ReactNode
  className?: string
}

export const PostEditorField: FC<PostEditorFieldProps> = ({
  className,
  children
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    {children}
  </div>
)
