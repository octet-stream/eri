import {Slot} from "@radix-ui/react-slot"
import {ChevronRight, MoreHorizontal} from "lucide-react"
import type {ComponentProps, ComponentRef, FC, ReactNode} from "react"

import {cn} from "../../lib/utils/cn.js"

export interface BreadcrumbProps extends ComponentProps<"nav"> {
  separator?: ReactNode
}

export const Breadcrumb: FC<BreadcrumbProps> = ({...props}) => (
  <nav aria-label="breadcrumb" {...props} />
)

export type BreadcrumbRef = ComponentRef<typeof Breadcrumb>

export type BreadcrumbListProps = ComponentProps<"ol">

export const BreadcrumbList: FC<BreadcrumbListProps> = ({
  className,
  ...props
}) => (
  <ol
    {...props}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
  />
)

export type BreadcrumbListRef = ComponentRef<typeof BreadcrumbList>

export type BreadcrumbItemProps = ComponentProps<"li">

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  className,
  ...props
}) => (
  <li
    {...props}
    className={cn("inline-flex items-center gap-1.5", className)}
  />
)

export type BreadcrumbItemRef = ComponentRef<"li">

export interface BreadcrumbLinkProps extends ComponentProps<"a"> {
  asChild?: boolean
}

export const BreadcrumbLink: FC<BreadcrumbLinkProps> = ({
  asChild,
  className,
  ...props
}) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
}

export type BreadcrumbLinkRef = ComponentRef<"a">

export type BreadcrumbPageProps = ComponentProps<"span">

export const BreadcrumbPage: FC<BreadcrumbPageProps> = ({
  className,
  ...props
}) => (
  // biome-ignore lint/a11y/useFocusableInteractive: Disabled because this code is generated
  <span
    {...props}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
  />
)

export type BreadcrumbPageRef = ComponentRef<"span">

export type BreadcrumbSeparatorProps = ComponentProps<"li">

export const BreadcrumbSeparator: FC<BreadcrumbSeparatorProps> = ({
  children,
  className,
  ...props
}) => (
  <li
    {...props}
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
  >
    {children ?? <ChevronRight />}
  </li>
)

export type BreadcrumbSeparatorRef = ComponentRef<"li">

export type BreadcrumbEllipsisProps = ComponentProps<"span">

export const BreadcrumbEllipsis: FC<BreadcrumbEllipsisProps> = ({
  className,
  ...props
}) => (
  <span
    {...props}
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)

export type BreadcrumbEllipsisRef = ComponentRef<"span">
