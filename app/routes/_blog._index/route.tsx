import {type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"

import {NoPosts} from "./components/NoPosts.js"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import {withTrpc} from "../../server/trpc/withTrpc.js"

export const loader = withTrpc(async trpc => {
  const page = await trpc.posts.getList()

  return {page, title: process.env.BLOG_NAME || "Eri's Blog"}
})

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {
    title: data?.title
  }
]

// TODO: Implement posts list
const HomePage = () => {
  const {page} = useLoaderData<typeof loader>()

  if (page.rowsCount < 0) {
    return <NoPosts />
  }

  return (
    <PostsContext.Provider value={page}>
      <PostsList />
    </PostsContext.Provider>
  )
}

export default HomePage
