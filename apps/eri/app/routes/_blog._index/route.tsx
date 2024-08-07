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
import {
  PostListOutput,
  type IPostListOutput
} from "../../server/zod/post/PostListOutput.js"

export const loader = defineLoader(async ({context: {orm}, request}) => {
  const search = new URL(request.url).searchParams
  const input = await PostListInput.safeParseAsync({
    current: search.get("page")
  })

  if (!input.success) {
    throw new Response(null, {
      status: 404
    })
  }

  const {args} = input.data
  const [items, count] = await orm.em.findAndCount(
    Post,

    {},

    {
      offset: args.offset,
      limit: args.limit
    }
  )

  const output = await PostListOutput.parseAsync({
    items,
    count,
    args
  } satisfies IPostListOutput)

  if (output.current < 1 || output.pagesCount < output.current) {
    throw new Response(null, {
      status: 404
    })
  }

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
