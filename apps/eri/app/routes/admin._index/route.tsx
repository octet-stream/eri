import {useLoaderData} from "@remix-run/react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import {defineAdminLoader} from "../../server/lib/admin/defineAdminLoader.js"

import {PostListInput} from "../../server/zod/post/PostListInput.js"
import {
  PostListOutput,
  type IPostListOutput
} from "../../server/zod/post/PostListOutput.js"
import {Post} from "../../server/db/entities.js"

export const loader = defineAdminLoader(async ({request, context: {orm}}) => {
  const search = new URL(request.url).searchParams
  const input = await PostListInput.safeParseAsync({
    current: search.get("page")
  })

  if (!input.success) {
    throw new Response(null, {
      status: 404
    })
  }

  const {args} = input.data
  const [items, count] = await orm.em.findAndCount(
    Post,

    {},

    {
      offset: args.offset,
      limit: args.limit
    }
  )

  const output = await PostListOutput.parseAsync({
    items,
    count,
    args
  } satisfies IPostListOutput)

  if (output.current < 1 || output.pagesCount < output.current) {
    throw new Response(null, {
      status: 404
    })
  }

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
