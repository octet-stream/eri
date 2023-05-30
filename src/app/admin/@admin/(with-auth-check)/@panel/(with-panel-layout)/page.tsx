import type {AFC} from "lib/type/AsyncFunctionComponent"
import {getPosts} from "app/(posts)/_/loader/getPosts"

const AdminPanelPage: AFC = async () => {
  const posts = await getPosts()

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
