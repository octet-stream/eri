import type {ComponentProps, ComponentRef, FC} from "react"

import {cn} from "../../lib/utils/cn.js"

export interface TableProps extends ComponentProps<"table"> {}

export const Table: FC<TableProps> = ({className, ref, ...props}) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
)

export type TableRef = ComponentRef<typeof Table>

export interface TableHeaderProps extends ComponentProps<"thead"> {}

export const TableHeader: FC<TableHeaderProps> = ({
  className,
  ref,
  ...props
}) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
)

export type TableHeaderRef = ComponentRef<"thead">

export interface TableBodyProps extends ComponentProps<"tbody"> {}

export const TableBody: FC<TableBodyProps> = ({className, ref, ...props}) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
)

export type TableBodyRef = ComponentRef<typeof TableBody>

export interface TableFooterProps extends ComponentProps<"tfoot"> {}

export const TableFooter: FC<TableFooterProps> = ({
  className,
  ref,
  ...props
}) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium last:[&>tr]:border-b-0",
      className
    )}
    {...props}
  />
)

export type TableFooterRef = ComponentRef<"tfoot">

export interface TableRowProps extends ComponentProps<"tr"> {}

export const TableRow: FC<TableRowProps> = ({className, ref, ...props}) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
)

export type TableRowRef = ComponentRef<"tr">

export interface TableHeadProps extends ComponentProps<"th"> {}

export const TableHead: FC<TableHeadProps> = ({className, ref, ...props}) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
)

export type TableHeadRef = ComponentRef<"th">

export interface TableCellProps extends ComponentProps<"td"> {}

export const TableCell: FC<TableCellProps> = ({className, ...props}) => (
  <td
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
)

export type TableCellRef = ComponentRef<"td">

export interface TableCaptionProps extends ComponentProps<"caption"> {}

export const TableCaption: FC<TableCaptionProps> = ({className, ...props}) => (
  <caption
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
)

export type TableCaptionRef = ComponentRef<typeof TableCaption>
