import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import create from "./create"

export default router<Context>()
  .merge(create)
