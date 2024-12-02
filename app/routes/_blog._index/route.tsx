import type {FC} from "react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import config from "../../server/lib/config.js"

import {Post} from "../../server/db/entities.js"
import {PostPage} from "../../server/zod/post/PostPage.js"

import type {Route} from "./+types/route.js"

export const loader = async ({context: {orm}, request}: Route.LoaderArgs) => {
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

  return {
    page: await page.reply({items, count}),
    title: config.app.name
  }
}

export const meta: Route.MetaFunction = ({data}) => [
  {
    title: data.title
  }
]

// TODO: Implement posts list
const HomePage: FC<Route.ComponentProps> = ({loaderData}) => {
  const {page} = loaderData

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
