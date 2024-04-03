import type {LucideIcon} from "lucide-react"
import type {FC, ReactNode} from "react"
import {Link} from "@remix-run/react"

import {cn} from "../../lib/utils.js"

export interface SidebarProps {
  className?: string
  children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({className, children}) => (
  <aside className={cn("flex flex-col laptop:w-[200px] shrink-0 border-r", className)}>
    <ol className="w-full flex flex-1 flex-col">
      {children}
    </ol>
  </aside>
)

export interface SidebarItemProps {
  icon: LucideIcon
  href: string
  className?: string
  children: ReactNode
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon: Icon,
  href,
  className,
  children
}) => (
  <li className={cn("p-5 py-2.5 first:pt-5 last:pb-5", className)}>
    <Link to={href} className="flex gap-3 items-center">
      <Icon />

      <div className="hidden laptop:block">
        {children}
      </div>
    </Link>
  </li>
)
