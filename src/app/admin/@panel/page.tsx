"use client"

import type {FC} from "react"
import {usePostsData} from "context/PostsDataContext"

const AdminPanelPage: FC = () => {
  const posts = usePostsData()

  if (posts.itemsCount < 1) {
    return <div>No posts yet</div>
  }

  return (
    <ul>
      {posts.items.map(post => (
        <li key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  )
}

export default AdminPanelPage
