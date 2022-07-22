import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import post from "./post"
import posts from "./posts"

const query = router<Context>()
  .merge("post.", post)
  .merge("posts.", posts)

export default query
