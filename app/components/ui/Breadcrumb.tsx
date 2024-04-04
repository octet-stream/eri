import type {ComponentPropsWithoutRef, ReactNode, ElementRef} from "react"
import {ChevronRight, MoreHorizontal} from "lucide-react"
import {Slot} from "@radix-ui/react-slot"
import {forwardRef} from "react"
import {cn} from "@udecode/cn"

export type BreadcrumbRef = ElementRef<"nav">

export type BreadcrumbProps = ComponentPropsWithoutRef<"nav"> & {
  separator?: ReactNode
}

export const Breadcrumb = forwardRef<BreadcrumbRef, BreadcrumbProps>(
  ({...props}, ref) => (
    <nav ref={ref} aria-label="breadcrumb" {...props} />
  )
)

Breadcrumb.displayName = "Breadcrumb"

export type BreadcrumbListRef = ElementRef<"ol">

export type BreadcrumbListProps = ComponentPropsWithoutRef<"ol">

export const BreadcrumbList = forwardRef<
/* eslint-disable @typescript-eslint/indent */
  BreadcrumbListRef,
  BreadcrumbListProps
/* eslint-enable @typescript-eslint/indent */
>(
  ({className, ...props}, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
)

BreadcrumbList.displayName = "BreadcrumbList"

export type BreadcrumbItemRef = ElementRef<"li">

export type BreadcrumbItemProps = ComponentPropsWithoutRef<"li">

export const BreadcrumbItem = forwardRef<
/* eslint-disable @typescript-eslint/indent */
  BreadcrumbItemRef,
  BreadcrumbItemProps
/* eslint-enable @typescript-eslint/indent */
>(
  ({className, ...props}, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
)

BreadcrumbItem.displayName = "BreadcrumbItem"

export type BreadcrumbLinkRef = ElementRef<"a">

export type BreadcrumbLinkProps = ComponentPropsWithoutRef<"a"> & {
  asChild?: boolean
}

export const BreadcrumbLink = forwardRef<
/* eslint-disable @typescript-eslint/indent */
  BreadcrumbLinkRef,
  BreadcrumbLinkProps
/* eslint-enable @typescript-eslint/indent */
>(
  ({asChild, className, ...props}, ref) => {
    const Comp = asChild ? Slot : "a"

    return (
      <Comp
        ref={ref}
        className={cn("transition-colors hover:text-foreground", className)}
        {...props}
      />
    )
  }
)

BreadcrumbLink.displayName = "BreadcrumbLink"

export type BreadcrumbPageRef = ElementRef<"span">

export type BreadcrumbPageProps = ComponentPropsWithoutRef<"span">

export const BreadcrumbPage = forwardRef<
/* eslint-disable @typescript-eslint/indent */
  BreadcrumbPageRef,
  BreadcrumbPageProps
/* eslint-enable @typescript-eslint/indent */
>(
  ({className, ...props}, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  )
)

BreadcrumbPage.displayName = "BreadcrumbPage"

export type BreadcrumbSeparatorRef = ElementRef<"li">

export type BreadcrumbSeparatorProps = ComponentPropsWithoutRef<"li">

export const BreadcrumbSeparator = forwardRef<
/* eslint-disable @typescript-eslint/indent */
  BreadcrumbSeparatorRef,
  BreadcrumbSeparatorProps
/* eslint-enable @typescript-eslint/indent */
>(({
  children,
  className,

  ...props
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
))

BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

export type BreadcrumbEllipsisRef = ElementRef<"span">

export type BreadcrumbEllipsisProps = ComponentPropsWithoutRef<"span">

export const BreadcrumbEllipsis = forwardRef<
/* eslint-disable @typescript-eslint/indent */
BreadcrumbEllipsisRef,
BreadcrumbEllipsisProps
/* eslint-enable @typescript-eslint/indent */
>(({
  className,

  ...props
}) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
))

BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"
