import {useLoaderData} from "@remix-run/react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import {defineAdminLoader} from "../../server/lib/admin/defineAdminLoader.server.js"

import {PostListOutput} from "../../server/zod/post/PostListOutput.js"
import {PostListInput} from "../../server/zod/post/PostListInput.js"
import {Post} from "../../server/db/entities.js"

import {parsePageInput} from "../../server/zod/utils/pagination/parsePageInput.js"
import {parsePageOutput} from "../../server/zod/utils/pagination/parsePageOutput.js"

export const loader = defineAdminLoader(async ({request, context: {orm}}) => {
  const search = new URL(request.url).searchParams
  const {args} = await parsePageInput(
    PostListInput,
    {
      page: search.get("page")
    },

    {
      async: true
    }
  )

  const [items, count] = await orm.em.findAndCount(
    Post,

    {},

    {
      offset: args.offset,
      limit: args.limit
    }
  )

  const output = await parsePageOutput(
    PostListOutput,

    {
      items,
      count,
      args
    },

    {
      async: true
    }
  )

  return output
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
