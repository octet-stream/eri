import type {
  MetaArgs_SingleFetch as MetaArgs,
  MetaDescriptor
} from "@remix-run/react"

import {Breadcrumb} from "../components/common/Breadcrumbs.jsx"
import type {BreadcrumbHandle} from "../components/common/Breadcrumbs.jsx"

import {defineAdminLoader} from "../server/lib/admin/defineAdminLoader.server.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"
import {PostOutput} from "../server/zod/post/PostOutput.js"
import {Post} from "../server/db/entities.js"

interface Params {
  date: string
  name: string
}

export const loader = defineAdminLoader(async ({params, context: {orm}}) => {
  const {date, name} = params as unknown as Params

  const post = await orm.em.findOneOrFail(
    Post,

    {
      slug: [date, name].join("/")
    },

    {
      populate: ["content"],
      failHandler(): never {
        throw new Response(null, {
          status: 404,
          statusText: "Unable to find post"
        })
      }
    }
  )

  return parseOutput(PostOutput, post, {async: true})
})

export const meta = ({data}: MetaArgs<typeof loader>): MetaDescriptor[] => [
  {
    title: data?.title
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>Post</Breadcrumb>
}

// Re-exporting component from public page, because they're identical. This will be changed in a future.
export {default} from "./_blog.posts.$date.$name.jsx"
