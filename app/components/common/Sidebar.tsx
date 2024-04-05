import type {LucideIcon} from "lucide-react"
import type {FC, ReactNode} from "react"
import {Link} from "@remix-run/react"
import {cn} from "@udecode/cn"

import {SheetContent, SheetClose} from "../ui/Sheet.jsx"

export interface SidebarProps {
  className?: string
  children: ReactNode
}

export const Sidebar: FC<SidebarProps> = ({className, children}) => (
  <SheetContent>
    <aside className={cn("flex flex-col w-full shrink-0", className)}>
      <ol className="w-full flex flex-1 flex-col">
        {children}
      </ol>
    </aside>
  </SheetContent>
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
  <li className={cn("py-2.5 first:pt-5 last:pb-5 w-full", className)}>
    <SheetClose asChild>
      <Link to={href} className="flex gap-3 items-center">
        <Icon />

        <div>
          {children}
        </div>
      </Link>
    </SheetClose>
  </li>
)

export {
  Sheet as SidebarProvider,
  SheetTrigger as SidebarTrigger
} from "../ui/Sheet.jsx"
