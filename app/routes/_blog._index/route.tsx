import type {FC} from "react"

import {ormContext} from "../../server/contexts/orm.ts"
import {Post} from "../../server/db/entities.ts"
import {PostPage} from "../../server/zod/post/PostPage.ts"
import type {Route} from "./+types/route.ts"
import {NoPosts} from "./components/NoPosts.tsx"
import {PostsList} from "./components/PostsList.tsx"

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
