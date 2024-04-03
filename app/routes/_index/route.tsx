import {json, type MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"

import {Post} from "../../server/db/entities.js"
import {withOrm} from "../../server/lib/db/orm.js"

import {NoPosts} from "./components/NoPosts.jsx"

import {
  Breadcrumbs,
  Breadcrumb,
  type BreadcrumbHandle
} from "../../components/common/Breadcrumbs.jsx"

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

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <Breadcrumb href="/">
      Blog
    </Breadcrumb>
  )
}

// TODO: Implement posts list
const HomePage = () => {
  const {count} = useLoaderData<typeof loader>()

  return (
    <div className="flex flex-col w-full pb-5 px-5 laptop:w-laptop laptop:mx-auto">
      <header className="py-5">
        <Breadcrumbs />
      </header>

      {
        count > 0
          ? <div>Posts will apper here</div>
          : <NoPosts />
      }
    </div>
  )
}

export default HomePage
