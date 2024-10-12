import type {FC} from "react"

import {PostContext} from "../contexts/PostContext.jsx"
import {usePostsContext} from "../contexts/PostsContext.jsx"
import {PostItem} from "./PostItem.jsx"

export const PostsList: FC = () => {
  const posts = usePostsContext()

  return (
    <ul className="flex flex-1 flex-col gap-3">
      {posts.items.map(post => (
        <li key={post.id}>
          <PostContext.Provider value={post}>
            <PostItem />
          </PostContext.Provider>
        </li>
      ))}
    </ul>
  )
}
