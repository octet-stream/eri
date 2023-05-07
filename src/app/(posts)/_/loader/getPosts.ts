import {createCaller} from "lib/trpc/server"

import type {SearchParams} from "../../(list)/page"

export const getPosts = createCaller(
  (trpc, params: SearchParams = {}) => trpc.posts.list({
    cursor: params.page
  })
)
