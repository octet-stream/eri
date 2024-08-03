import {useLoaderData} from "@remix-run/react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import {withTrpc} from "../../server/trpc/withTrpc.js"

export const loader = withTrpc(trpc => trpc.posts.getList())

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
