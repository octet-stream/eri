import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import post from "./post"
import user from "./user"

export default router<Context>()
  .merge("post.", post)
  .merge("user.", user)
