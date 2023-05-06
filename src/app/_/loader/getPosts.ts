import {createCaller} from "lib/trpc/server"

import type {SearchParams} from "../../page"

export const getPosts = createCaller(
  (trpc, params: SearchParams = {}) => trpc.posts.all({
    cursor: params.page
  })
)
