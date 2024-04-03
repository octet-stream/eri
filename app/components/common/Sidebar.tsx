import type {FC, ReactNode} from "react"

import {cn} from "../../lib/utils.js"

export interface SidebarProps {
  className?: string
  children: ReactNode
}

export interface SidebarItemProps {
  className?: string
  children: ReactNode
}

export const SidebarItem: FC<SidebarItemProps> = ({
  className,
  children
}) => (
  <li className={cn("", className)}>
    {children}
  </li>
)

export const Sidebar: FC<SidebarProps> = ({className, children}) => (
  <aside className={cn("flex flex-col w-[200px] shrink-0 border-r", className)}>
    <ol className="p-5 w-full flex flex-1 flex-col">
      {children}
    </ol>
  </aside>
)
