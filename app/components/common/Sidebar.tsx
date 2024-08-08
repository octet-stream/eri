import {Fragment, type FC, type ReactNode} from "react"
import type {LucideIcon} from "lucide-react"
import {Link} from "@remix-run/react"
import {cn} from "@udecode/cn"

import {SheetContent, SheetClose, SheetTrigger} from "../ui/Sheet.jsx"

export interface SidebarProps {
  className?: string
  children: ReactNode
}

const SidebarContent: FC<SidebarProps> = ({children, className}) => (
  <aside
    className={cn(
      "flex flex-col w-full post:w-[200px] laptop:px-5 shrink-0 text-sm",
      className
    )}
  >
    <ol className="w-full flex flex-1 flex-col">{children}</ol>
  </aside>
)

export const Sidebar: FC<SidebarProps> = ({className, children}) => (
  <Fragment>
    <SidebarContent className={cn(className, "hidden post:flex")}>
      {children}
    </SidebarContent>

    <SheetContent>
      <SidebarContent>{children}</SidebarContent>
    </SheetContent>
  </Fragment>
)

export interface SidebarTriggerProps {
  children: ReactNode
}

export const SidebarTrigger: FC<SidebarTriggerProps> = ({children}) => (
  <SheetTrigger className="post:hidden">{children}</SheetTrigger>
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
  <li
    className={cn(
      "py-2.5 post:px-5 laptop:px-0 first:pt-5 last:pb-5 w-full",
      className
    )}
  >
    <SheetClose asChild>
      {/* FIXME: This component breaks in sidebar and I have no idea why */}
      <Link to={href} className="flex gap-3 items-center">
        <Icon size={20} />

        <span>{children}</span>
      </Link>
    </SheetClose>
  </li>
)

export {Sheet as SidebarProvider} from "../ui/Sheet.jsx"
