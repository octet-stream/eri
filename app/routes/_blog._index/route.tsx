import type {FC} from "react"

import {ormContext} from "../../server/contexts/orm.js"
import {Post} from "../../server/db/entities.js"
import {PostPage} from "../../server/zod/post/PostPage.js"
import type {Route} from "./+types/route.js"
import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"

export const loader = async ({context, request}: Route.LoaderArgs) => {
  const orm = context.get(ormContext)

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
