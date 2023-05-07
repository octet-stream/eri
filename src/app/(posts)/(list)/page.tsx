import type {AFC} from "lib/type/AsyncFunctionComponent"
import {PostsDataContextProvider} from "context/PostsDataContext"

import {PostsView} from "../_/component/PostsView"
import {getPosts} from "../_/loader/getPosts"

export const dynamic = "force-dynamic"

export interface SearchParams {
  page?: string
}

interface Props {
  searchParams: SearchParams
}

const Page: AFC<Props> = async ({searchParams}) => {
  const posts = await getPosts(searchParams)

  return (
    <PostsDataContextProvider data={posts}>
      <PostsView />
    </PostsDataContextProvider>
  )
}

export default Page
