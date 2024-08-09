import {unstable_defineLoader as defineLoader} from "@remix-run/node"
import {
  type MetaArgs_SingleFetch as MetaArgs,
  type MetaDescriptor,
  useLoaderData
} from "@remix-run/react"

import {NoPosts} from "./components/NoPosts.jsx"
import {PostsList} from "./components/PostsList.jsx"
import {PostsContext} from "./contexts/PostsContext.jsx"

import {Post} from "../../server/db/entities.js"
import {PostListInput} from "../../server/zod/post/PostListInput.js"
import {PostListOutput} from "../../server/zod/post/PostListOutput.js"

import {parsePageInput} from "../../server/zod/utils/parsePageInput.js"
import {parsePageOutput} from "../../server/zod/utils/parsePageOutput.js"

export const loader = defineLoader(async ({context: {orm}, request}) => {
  const search = new URL(request.url).searchParams
  const {args} = await parsePageInput(
    PostListInput,
    {
      page: search.get("page")
    },

    {
      async: true
    }
  )

  const [items, count] = await orm.em.findAndCount(
    Post,

    {},

    {
      offset: args.offset,
      limit: args.limit
    }
  )

  const output = await parsePageOutput(
    PostListOutput,

    {
      items,
      count,
      args
    },

    {
      async: true
    }
  )

  return {
    page: output,
    title: process.env.BLOG_NAME || "Eri's blog"
  }
})

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
