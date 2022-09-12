import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import create from "./create"
import update from "./update"

const post = router<Context>()
  .merge(create)
  .merge(update)

export default post
