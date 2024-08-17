import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper
} from "@tanstack/react-table"
import {useLoaderData, generatePath, Link} from "@remix-run/react"
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
import {formatPostDate} from "../../../lib/utils/formatPostDate.js"

export type PostsListData = Awaited<ReturnType<typeof loader>>["items"][number]

const helper = createColumnHelper<PostsListData>()

const columns = [
  // {
  //   id: "select"
  // },
  helper.accessor("title", {
    id: "title",
    enableHiding: false,
    header: () => "Title",
    cell: ctx => (
      <Link
        to={generatePath("/admin/posts/:slug", {
          slug: ctx.row.getValue("slug")
        })}
      >
        {ctx.getValue()}
      </Link>
    )
  }),
  // {
  //   id: "actions"
  // },
  helper.accessor("createdAt", {
    id: "createdAt",
    enableHiding: false,
    header: () => "Created",
    cell: ctx => formatPostDate(ctx.getValue())
  }),
  helper.accessor("slug", {
    id: "slug",
    enableHiding: false,
    header: () => null,
    cell: ctx => (
      <a
        target="_blank"
        rel="noreferrer"
        href={generatePath("/admin/posts/:slug", {slug: ctx.getValue()})}
        aria-label="Open post in a new tab"
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
    <div className="w-full">
      <div className="rounded-md border">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
