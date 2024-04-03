import {useLoaderData} from "@remix-run/react"

// TODO: Replace loader on this page with it's own when I add filters
import {loader} from "../_blog._index/route.jsx"

import {NoPosts} from "./components/NoPosts.js"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

export {loader}

const AdminDashboardPage = () => {
  const page = useLoaderData<typeof loader>()

  if (page.count < 0) {
    return <NoPosts />
  }

  return (
    <PostsContext.Provider value={page}>
      <PostsList />
    </PostsContext.Provider>
  )
}

export default AdminDashboardPage
