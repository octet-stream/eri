import type {LoaderFunctionArgs} from "@remix-run/node"
import type {MetaArgs, MetaDescriptor} from "@remix-run/react"
import {useLoaderData} from "@remix-run/react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import config from "../../server/lib/config.js"

import {Post} from "../../server/db/entities.js"
import {PostPage} from "../../server/zod/post/PostPage.js"

export const loader = async ({context: {orm}, request}: LoaderFunctionArgs) => {
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

export const meta = ({data}: MetaArgs<typeof loader>): MetaDescriptor[] => [
  {
    title: data?.title
  }
]

// TODO: Implement posts list
const HomePage = () => {
  const {page} = useLoaderData<typeof loader>()

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
