import type {FC, ReactNode} from "react"

import {cn} from "../../lib/utils.js"

export interface SidebarProps {
  className?: string
  children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({className, children}) => (
  <aside className={cn("w-[200px] shrink-0 border-r py-5", className)}>
    {children}
  </aside>
)
