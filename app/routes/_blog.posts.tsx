import {Outlet} from "@remix-run/react"
import type {FC} from "react"

const PostsLayout: FC = () => (
  <div className="w-full laptop:max-w-post laptop:mx-auto">
    <Outlet />
  </div>
)

export default PostsLayout
