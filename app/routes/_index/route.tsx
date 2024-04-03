import {json, type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"

import {Post} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"

import {NoPosts} from "./components/NoPosts.jsx"

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
    <div className="flex flex-col w-full p-5 laptop:w-laptop laptop:mx-auto">
      {
        count > 0
          ? <div>Posts will apper here</div>
          : <NoPosts />
      }
    </div>
  )
}

export default HomePage
