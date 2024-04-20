import {trpc} from "./trpc.js"

import {admin} from "./routes/admin.js"
import {posts} from "./routes/posts.js"

export const router = trpc.router({
  admin,
  posts
})

export type Router = typeof router
