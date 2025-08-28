import type {FC} from "react"
import {useLoaderData} from "react-router"

import {PostContext} from "../contexts/PostContext.tsx"
import type {loader} from "../route.tsx"
import {PostItem} from "./PostItem.tsx"

export const PostsList: FC = () => {
  const posts = useLoaderData<typeof loader>()

  return (
    <ul className="flex flex-1 flex-col gap-3">
      {posts.items.map(post => (
        <li key={post.id}>
          <PostContext value={post}>
            <PostItem />
          </PostContext>
        </li>
      ))}
    </ul>
  )
}
