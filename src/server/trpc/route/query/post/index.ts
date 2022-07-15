import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import getBySlug from "./getBySlug"

export default router<Context>()
  .merge(getBySlug)
