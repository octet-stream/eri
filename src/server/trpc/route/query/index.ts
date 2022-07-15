import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import posts from "./post/posts"

export default router<Context>()
  .merge(posts)
