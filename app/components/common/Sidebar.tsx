import {Slot} from "@radix-ui/react-slot"
import {cn} from "@udecode/cn"
import type {LucideIcon} from "lucide-react"
import {type ComponentProps, type FC, Fragment, type ReactNode} from "react"
import {Link} from "react-router"

import {SheetClose, SheetContent, SheetTrigger} from "../ui/Sheet.jsx"

export interface SidebarProps {
  className?: string
  children: ReactNode
}

const SidebarContent: FC<SidebarProps> = ({children, className}) => (
  <aside
    className={cn(
      "flex flex-col bg-background w-full post:w-[200px] sticky post:h-[calc(100dvh_-_65px)] post:top-[65px] laptop:px-5 shrink-0 text-sm",
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

    {/* FIXME: Hide sheet and overlay for big displays */}
    <SheetContent className="flex flex-1">
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

interface SidebarLinkItemProps extends ComponentProps<"a"> {
  href: string
  children: ReactNode
  asChild?: boolean
}

const SidebarLinkItem: FC<SidebarLinkItemProps> = ({asChild, ...props}) => {
  const Element = asChild ? Slot : "a"

  return <Element {...props} />
}

export interface SidebarButtonItemProps {
  href?: never
  children: ReactNode
  asChild?: boolean
}

export const SidebarButtonItem: FC<SidebarButtonItemProps> = ({
  asChild,
  ...props
}) => {
  const Element = asChild ? Slot : "button"

  return <Element {...props} />
}

export interface SidebarItemBaseProps {
  icon: LucideIcon
  className?: string
  children: ReactNode
  asChild?: boolean
}

export type SidebarItemProps = SidebarItemBaseProps &
  (SidebarButtonItemProps | SidebarLinkItemProps)

export const SidebarItem: FC<SidebarItemProps> = ({
  icon: Icon,
  className,
  href,
  ...props
}) => {
  return (
    <li
      className={cn(
        "py-2.5 post:px-5 laptop:px-0 first:pt-5 last:pb-5 w-full",
        className
      )}
    >
      <SheetClose asChild>
        {/* FIXME: This component breaks in sidebar and I have no idea why */}
        {/* <Link to={href} className="flex gap-3 items-center">
          <Icon size={20} />

          <Element {...props}>{children}</Element>
        </Link> */}

        <div className="flex gap-3 items-center">
          <Icon size={20} />

          {href ? (
            <SidebarLinkItem {...props} href={href} />
          ) : (
            <SidebarButtonItem {...props} />
          )}
        </div>
      </SheetClose>
    </li>
  )
}

export {Sheet as SidebarProvider} from "../ui/Sheet.jsx"
