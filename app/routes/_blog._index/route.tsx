import {json, type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"

import {Post} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"

import {NoPosts} from "./components/NoPosts.js"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

export const loader = withOrm(async orm => {
  const [list, count] = await orm.em.findAndCount(Post, {}, {
    orderBy: {
      createdAt: "desc"
    }
  })

  return json({list, count, title: process.env.BLOG_NAME || "Eri's Blog"})
})

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {
    title: data?.title
  }
]

// TODO: Implement posts list
const HomePage = () => {
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

export default HomePage
