import type {FC} from "react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"

import {Post} from "../../server/db/entities.js"
import type {ContextFix} from "../../server/lib/types/ContextFix.js"
import {PostPage} from "../../server/zod/post/PostPage.js"

import type {Route} from "./+types/route.js"

export const loader = async ({
  context: {orm},
  request
}: ContextFix<Route.LoaderArgs>) => {
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
}

const HomePage: FC<Route.ComponentProps> = ({loaderData: page}) =>
  page.rowsCount > 0 ? <PostsList /> : <NoPosts />

export default HomePage
