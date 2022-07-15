import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import all from "./all"

export default router<Context>()
  .merge(all)
