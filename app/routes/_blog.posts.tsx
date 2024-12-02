import type {FC} from "react"
import {Outlet} from "react-router"

const PostsLayout: FC = () => (
  <div className="w-full post:max-w-post post:mx-auto">
    <Outlet />
  </div>
)

export default PostsLayout
