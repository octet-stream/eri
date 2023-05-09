import {PostsDataContextProvider} from "context/PostsDataContext"
import type {AFC} from "lib/type/AsyncFunctionComponent"

import {getPosts} from "../_/loader/getPosts"

import {PostsView} from "./_/component/PostsView"

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
