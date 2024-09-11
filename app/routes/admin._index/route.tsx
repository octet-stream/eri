import {useLoaderData} from "@remix-run/react"
import type {FC} from "react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"

import {defineAdminLoader} from "../../server/lib/admin/defineAdminLoader.js"

import {Post} from "../../server/db/entities.js"

import {PostPage} from "../../server/zod/post/PostPage.js"

export const loader = defineAdminLoader(async ({request, context: {orm}}) => {
  const search = new URL(request.url).searchParams
  const page = await PostPage.parseAsync({
    page: search.get("page")
  })

  const {args} = page.params
  const [items, count] = await orm.em.findAndCount(
    Post,

    {},

    {
      offset: args.offset,
      limit: args.limit,
      orderBy: {
        createdAt: "desc"
      }
    }
  )

  return page.reply({items, count})
})

const AdminDashboardPage: FC = () => {
  const {rowsCount} = useLoaderData<typeof loader>()

  return rowsCount > 0 ? <PostsList /> : <NoPosts />
}

export default AdminDashboardPage
