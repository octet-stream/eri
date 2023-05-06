import {createCaller} from "lib/trpc/server"

import type {Params} from "../../page"

export const getPost = createCaller(
  (trpc, params: Params) => trpc.post.getBySlug({
    slug: params
  })
)
