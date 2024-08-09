import {useLoaderData} from "@remix-run/react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import {defineAdminLoader} from "../../server/lib/admin/defineAdminLoader.server.js"

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
      limit: args.limit
    }
  )

  return page.reply({items, count})
})

const AdminDashboardPage = () => {
  const posts = useLoaderData<typeof loader>()

  if (posts.rowsCount < 0) {
    return <NoPosts />
  }

  return (
    <PostsContext.Provider value={posts}>
      <PostsList />
    </PostsContext.Provider>
  )
}

export default AdminDashboardPage
