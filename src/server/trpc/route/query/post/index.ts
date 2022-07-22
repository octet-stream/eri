import {router} from "@trpc/server"

import type {Context} from "server/trpc/context"

import getBySlug from "./getBySlug"

const post = router<Context>()
  .merge(getBySlug)

export default post
