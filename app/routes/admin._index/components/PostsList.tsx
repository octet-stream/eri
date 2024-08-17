import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
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

export type PostsListData = Awaited<ReturnType<typeof loader>>["items"][number]

const helper = createColumnHelper<PostsListData>()

const columns = [
  // {
  //   id: "select"
  // },
  helper.accessor("title", {
    id: "title",
    header: () => "Title",
    cell: ctx => (
      <a
        href={generatePath("/admin/posts/:slug", {
          slug: ctx.row.getValue("slug")
        })}
      >
        {ctx.getValue()}
      </a>
    )
  }),
  // {
  //   id: "actions"
  // },
  helper.accessor("slug", {
    id: "slug",
    header: () => "Link",
    cell: ctx => (
      <a
        target="_blank"
        rel="noreferrer"
        href={generatePath("/admin/posts/:slug", {slug: ctx.getValue()})}
      >
        <SquareArrowOutUpRight size={20} />
      </a>
    )
  })
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
