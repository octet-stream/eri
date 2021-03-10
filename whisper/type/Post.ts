import Node from "./Node"

import User from "./User"
import Dates from "./Dates"

interface Post extends Node {
  author: User
  title: string
  readonly slug: string
  text: string
  isDraft: boolean
  dates: Dates
}

export default Post
