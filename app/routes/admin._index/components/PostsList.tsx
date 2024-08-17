import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef
} from "@tanstack/react-table"
import {useLoaderData, generatePath} from "@remix-run/react"
import {SquareArrowOutUpRight} from "lucide-react"
import type {FC} from "react"

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableCell,
  TableRow
} from "../../../components/ui/Table.jsx"

import type {loader} from "../route.jsx"

export type PostsListData = Awaited<ReturnType<typeof loader>>["items"]

const columns: ColumnDef<PostsListData[number]>[] = [
  // {
  //   id: "select"
  // },
  {
    id: "title",
    header: () => <div>Title</div>,
    cell: ({row}) => (
      <a href={generatePath("/admin/posts/:slug", {slug: row.original.slug})}>
        {row.original.title}
      </a>
    )
  },
  // {
  //   id: "actions"
  // },
  {
    id: "link",
    header: () => <div>Link</div>,
    cell: ({row}) => (
      <a
        target="_blank"
        rel="noreferrer"
        href={generatePath("/admin/posts/:slug", {slug: row.original.slug})}
      >
        <SquareArrowOutUpRight size={20} />
      </a>
    )
  }
]

export const PostsList: FC = () => {
  const posts = useLoaderData<typeof loader>()

  const table = useReactTable({
    data: posts.items,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="rounded-md border w-full">
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
