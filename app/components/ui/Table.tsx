import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HtmlHTMLAttributes
} from "react"
import {forwardRef} from "react"

import {cn} from "@udecode/cn"

export type TableRef = ElementRef<"table">

export interface TableProps extends ComponentPropsWithoutRef<"table"> {}

export const Table = forwardRef<TableRef, TableProps>(
  ({className, ...props}, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
)

Table.displayName = "Table"

export type TableHeaderRef = ElementRef<"thead">

export interface TableHeaderProps extends ComponentPropsWithoutRef<"thead"> {}

export const TableHeader = forwardRef<TableHeaderRef, TableHeaderProps>(
  ({className, ...props}, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  )
)

TableHeader.displayName = "TableHeader"

export type TableBodyRef = ElementRef<"tbody">

export interface TableBodyProps extends ComponentPropsWithoutRef<"tbody"> {}

export const TableBody = forwardRef<TableBodyRef, TableBodyProps>(
  ({className, ...props}, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
)

TableBody.displayName = "TableBody"

export type TableFooterRef = ElementRef<"tfoot">

export interface TableFooterProps extends ComponentPropsWithoutRef<"tfoot"> {}

export const TableFooter = forwardRef<TableFooterRef, TableHeaderProps>(
  ({className, ...props}, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-muted/50 font-medium last:[&>tr]:border-b-0",
        className
      )}
      {...props}
    />
  )
)

TableFooter.displayName = "TableFooter"

export type TableRowRef = ElementRef<"tr">

export interface TableRowProps extends ComponentPropsWithoutRef<"tr"> {}

export const TableRow = forwardRef<TableRowRef, TableRowProps>(
  ({className, ...props}, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
)

TableRow.displayName = "TableRow"

export type TableHeadRef = ElementRef<"th">

export interface TableHeadProps extends ComponentPropsWithoutRef<"th"> {}

export const TableHead = forwardRef<TableHeadRef, TableHeadProps>(
  ({className, ...props}, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
)

TableHead.displayName = "TableHead"

export type TableCellRef = ElementRef<"td">

export interface TableCellProps extends ComponentPropsWithoutRef<"td"> {}

export const TableCell = forwardRef<TableCellRef, TableCellProps>(
  ({className, ...props}, ref) => (
    <td
      ref={ref}
      className={cn(
        "p-4 align-middle [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
)

TableCell.displayName = "TableCell"

export type TableCaptionRef = HTMLTableCaptionElement

export interface TableCaptionProps
  extends HtmlHTMLAttributes<TableCaptionRef> {}

export const TableCaption = forwardRef<TableCaptionRef, TableCaptionProps>(
  ({className, ...props}, ref) => (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)

TableCaption.displayName = "TableCaption"
