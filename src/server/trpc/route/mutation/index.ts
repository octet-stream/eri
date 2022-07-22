import {router} from "@trpc/server"

import type {GlobalContext} from "server/trpc/context"

import post from "./post"
import user from "./user"

const mutation = router<GlobalContext>()
  .merge("post.", post)
  .merge("user.", user)

export default mutation
