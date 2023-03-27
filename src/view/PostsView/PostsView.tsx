import type {FC} from "react"

import {OPostsPageOutput} from "server/trpc/type/output/PostsPageOutput"
import {usePageData} from "lib/hook/usePageData"

import {PostsList} from "./PostsList"
import {NoPosts} from "./NoPosts"

export const PostsView: FC = () => {
  const {itemsCount} = usePageData<OPostsPageOutput>()

  return itemsCount > 0 ? <PostsList /> : <NoPosts />
}
