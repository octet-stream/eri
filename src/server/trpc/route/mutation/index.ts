import {router} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import post from "./post"
import user from "./user"

export default router<GlobalContext>()
  .merge("post.", post)
  .merge("user.", user)
