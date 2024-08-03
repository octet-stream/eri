import {Outlet} from "@remix-run/react"
import type {FC} from "react"

const PostsLayout: FC = () => (
  <div className="w-full post:max-w-post post:mx-auto">
    <Outlet />
  </div>
)

export default PostsLayout
