import type {FC} from "react"
import {Link} from "react-router"

import {usePostContext} from "../contexts/PostContext.jsx"

export const PostItem: FC = () => {
  const {title, slug} = usePostContext()

  return <Link to={`/admin/posts/${slug}`}>{title}</Link>
}
