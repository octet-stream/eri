import type {FC} from "react"

import {usePostsContext} from "../contexts/PostsContext.jsx"
import {PostContext} from "../contexts/PostContext.jsx"
import {PostItem} from "./PostItem.jsx"

export const PostsList: FC = () => {
  const posts = usePostsContext()

  return (
    <ul className="flex flex-1 flex-col gap-3">
      {posts.list.map(post => (
        <li key={post.id}>
          <PostContext.Provider value={post}>
            <PostItem />
          </PostContext.Provider>
        </li>
      ))}
    </ul>
  )
}
