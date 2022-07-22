import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import create from "./create"

const post = router<Context>()
  .merge(create)

export default post
