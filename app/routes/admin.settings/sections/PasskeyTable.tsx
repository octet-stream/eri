import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import {cn} from "@udecode/cn"
import {MoreHorizontal} from "lucide-react"
import type {FC} from "react"
import {useLoaderData} from "react-router"

import {formatPostDate} from "../../../lib/utils/formatPostDate.js"
import type {OPasskeyOutput} from "../../../server/zod/admin/PasskeyOutput.js"

import {Button} from "../../../components/ui/Button.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../../../components/ui/DropdownMenu.jsx"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../components/ui/Table.jsx"

import type {Route} from "../+types/route.js"

type PageData = Route.ComponentProps["loaderData"]

const helper = createColumnHelper<OPasskeyOutput>()

const columns = [
  helper.accessor("name", {
    id: "name",
    enableHiding: false,
    header: () => "Name",
    cell(ctx) {
      const value = ctx.getValue()

      return (
        <span className={cn({"text-muted-foreground": !value})}>
          {value || "No name"}
        </span>
      )
    }
  }),
  helper.accessor("createdAt", {
    id: "createdAt",
    enableHiding: false,
    header: () => "Created",
    cell: ctx => (
      <span suppressHydrationWarning>{formatPostDate(ctx.getValue())}</span>
    )
  }),
  helper.display({
    id: "actions",
    enableHiding: false,
    cell() {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0 h-8 w-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Edit</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <button
                type="submit"
                className="w-full text-destructive focus:text-destructive"
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  })
]

export const PasskeyTable: FC = () => {
  const {passkeys: data} = useLoaderData<PageData>()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(group => (
          <TableRow key={group.id}>
            {group.headers.map(header => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              No passkeys found. You can create one by clicking on the "+"
              button
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
