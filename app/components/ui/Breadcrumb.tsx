import {Slot} from "@radix-ui/react-slot"
import {cn} from "@udecode/cn"
import {ChevronRight, MoreHorizontal} from "lucide-react"
import type {ComponentPropsWithoutRef, ElementRef, ReactNode} from "react"
import {forwardRef} from "react"

export type BreadcrumbRef = ElementRef<"nav">

export type BreadcrumbProps = ComponentPropsWithoutRef<"nav"> & {
  separator?: ReactNode
}

export const Breadcrumb = forwardRef<BreadcrumbRef, BreadcrumbProps>(
  ({...props}, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)

Breadcrumb.displayName = "Breadcrumb"

export type BreadcrumbListRef = ElementRef<"ol">

export type BreadcrumbListProps = ComponentPropsWithoutRef<"ol">

export const BreadcrumbList = forwardRef<
  BreadcrumbListRef,
  BreadcrumbListProps
>(({className, ...props}, ref) => (
  <ol
    {...props}
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
  />
))

BreadcrumbList.displayName = "BreadcrumbList"

export type BreadcrumbItemRef = ElementRef<"li">

export type BreadcrumbItemProps = ComponentPropsWithoutRef<"li">

export const BreadcrumbItem = forwardRef<
  BreadcrumbItemRef,
  BreadcrumbItemProps
>(({className, ...props}, ref) => (
  <li
    {...props}
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
  />
))

BreadcrumbItem.displayName = "BreadcrumbItem"

export type BreadcrumbLinkRef = ElementRef<"a">

export type BreadcrumbLinkProps = ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean
}

export const BreadcrumbLink = forwardRef<
  BreadcrumbLinkRef,
  BreadcrumbLinkProps
>(({asChild, className, ...props}, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})

BreadcrumbLink.displayName = "BreadcrumbLink"

export type BreadcrumbPageRef = ElementRef<"span">

export type BreadcrumbPageProps = ComponentPropsWithoutRef<"span">

export const BreadcrumbPage = forwardRef<
  BreadcrumbPageRef,
  BreadcrumbPageProps
>(({className, ...props}, ref) => (
  // biome-ignore lint/a11y/useFocusableInteractive: Disabled because this code is generated
  <span
    {...props}
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
  />
))

BreadcrumbPage.displayName = "BreadcrumbPage"

export type BreadcrumbSeparatorRef = ElementRef<"li">

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<"li">

export const BreadcrumbSeparator = forwardRef<
  BreadcrumbSeparatorRef,
  BreadcrumbSeparatorProps
>(({children, className, ...props}, ref) => (
  <li
    {...props}
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
  >
    {children ?? <ChevronRight />}
  </li>
))

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export type BreadcrumbEllipsisRef = ElementRef<"span">

export type BreadcrumbEllipsisProps = ComponentPropsWithoutRef<"span">

export const BreadcrumbEllipsis = forwardRef<
  BreadcrumbEllipsisRef,
  BreadcrumbEllipsisProps
>(({className, ...props}, ref) => (
  <span
    {...props}
    ref={ref}
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
))

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"
