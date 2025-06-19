import type {FC} from "react"

import {ormContext} from "../../server/contexts/orm.js"
import {Post} from "../../server/db/entities.js"
import {withAdmin} from "../../server/lib/admin/withAdmin.js"
import {PostPage} from "../../server/zod/post/PostPage.js"
import type {Route} from "./+types/route.js"
import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"

export const loader = withAdmin(
  async ({request, context}: Route.LoaderArgs) => {
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
)

const AdminDashboardPage: FC<Route.ComponentProps> = ({loaderData}) => {
  const {rowsCount} = loaderData

  return rowsCount > 0 ? <PostsList /> : <NoPosts />
}

export default AdminDashboardPage
