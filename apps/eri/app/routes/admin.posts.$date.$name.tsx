import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node"

import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"
import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"

import {withTrpc} from "../server/trpc/withTrpc.js"

interface Params {
  date: string
  name: string
}

export const loader = withTrpc(async (trpc, {params}: LoaderFunctionArgs) => {
  const {date, name} = params as unknown as Params

  return trpc.admin.posts.getBySlug({slug: [date, name].join("/")})
})

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {
    title: data?.title
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <Breadcrumb>
      Post
    </Breadcrumb>
  )
}

// Re-exporting component from public page, because they're identical. This will be changed in a future.
export {default} from "./_blog.posts.$date.$name.jsx"
