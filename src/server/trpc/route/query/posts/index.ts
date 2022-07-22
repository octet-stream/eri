import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import all from "./all"

const posts = router<Context>()
  .merge(all)

export default posts
