import {json, type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"

import {Post} from "../server/db/entities.js"
import {withOrm} from "../server/lib/db/orm.js"

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
  const {count} = useLoaderData<typeof loader>()

  return (
    <div className="w-full p-5 laptop:w-laptop laptop:mx-auto">
      <div className="text-center">
        {count > 0 ? "Posts will apper here" : "No posts yet"}
      </div>
    </div>
  )
}

export default HomePage
