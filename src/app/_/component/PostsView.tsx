import type {FC} from "react"

import {usePostsData} from "context/PostsDataContext"

import {PostsList} from "./PostsList"
import {NoPosts} from "./NoPosts"

export const PostsView: FC = () => {
  const {itemsCount} = usePostsData()

  return itemsCount > 0 ? <PostsList /> : <NoPosts />
}
