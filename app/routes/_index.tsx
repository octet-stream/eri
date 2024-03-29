import {json, type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"

import {Post} from "../server/db/entities.js"
import {withOrm} from "../server/lib/db/orm.js"

export const meta: MetaFunction = () => [
  {
    title: "New Remix App"
  },
  {
    name: "description",
    content: "Welcome to Remix!"
  }
]

export const loader = withOrm(async orm => {
  const [list, count] = await orm.em.findAndCount(Post, {}, {
    orderBy: {
      createdAt: "desc"
    }
  })

  return json({list, count})
})

// TODO: Implement posts list
const HomePage = () => {
  const {count} = useLoaderData<typeof loader>()

  return (
    <div>
      {count > 0 ? "Posts will apper here" : "No posts yet"}
    </div>
  )
}

export default HomePage
