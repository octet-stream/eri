import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import {MoreHorizontal, SquareArrowOutUpRight} from "lucide-react"
import type {FC, MouseEventHandler} from "react"
import {useMemo} from "react"
import {href, Link, useLoaderData} from "react-router"
import {useEvent} from "react-use-event-hook"
import {toast} from "sonner"

import {Button} from "../../../components/ui/Button.jsx"
import {Checkbox} from "../../../components/ui/Checkbox.jsx"
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

import {formatPostDate} from "../../../lib/utils/formatPostDate.js"
import {slugToParams} from "../../../server/lib/utils/slug.js"
import type {loader} from "../route.jsx"

export type PostsListData = Awaited<ReturnType<typeof loader>>["items"][number]

const helper = createColumnHelper<PostsListData>()

const createAdminPathname = (slug: string) =>
  href("/admin/posts/:date/:name", slugToParams(slug))

const createPublicPathname = (slug: string) =>
  href("/posts/:date/:name", slugToParams(slug))

const columns = [
  helper.display({
    id: "select",
    header: ({table}) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all posts"
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select post"
      />
    )
  }),
  helper.accessor("title", {
    id: "title",
    enableHiding: false,
    header: () => "Title",
    cell: ctx => (
      <Link to={createAdminPathname(ctx.row.getValue("slug"))}>
        {ctx.getValue()}
      </Link>
    )
  }),
  helper.accessor("createdAt", {
    id: "createdAt",
    enableHiding: false,
    header: () => "Created",
    cell: ctx => (
      <span suppressHydrationWarning>{formatPostDate(ctx.getValue())}</span>
    )
  }),
  helper.accessor("slug", {
    id: "slug",
    enableHiding: false,
    header: () => null,
    cell: ctx => (
      <a
        target="_blank"
        rel="noreferrer"
        href={createAdminPathname(ctx.getValue())}
        aria-label="View post in blog"
      >
        <SquareArrowOutUpRight size={16} />
      </a>
    )
  }),
  helper.display({
    id: "actions",
    enableHiding: false,
    cell: ({row}) => {
      const {original: post} = row

      const publicPathname = useMemo(
        () => createPublicPathname(post.slug),

        [post.slug]
      )

      const copyLink = useEvent<MouseEventHandler>(async () => {
        await navigator.clipboard.writeText(
          new URL(publicPathname, window.location.href).href
        )

        toast.success("Link copied")
      })

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

            <DropdownMenuItem
              asChild
              className="w-full flex flex-row gap-2 items-center"
            >
              <a href={publicPathname} target="_blank" rel="noreferrer">
                <span>View in blog</span>

                <SquareArrowOutUpRight size={16} />
              </a>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={copyLink}>Copy link</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to={`${createAdminPathname(post.slug)}/edit`}>Edit</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>Mark as draft</DropdownMenuItem>

            <DropdownMenuItem>Archive</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
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
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
