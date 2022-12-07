import {trpc} from "server/trpc/def"

import posts from "./route/posts"
import post from "./route/post"
import user from "./route/user"

export const router = trpc.router({
  posts,
  post,
  user
})

export type Router = typeof router

export type Caller = ReturnType<typeof router.createCaller>
