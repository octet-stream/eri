import {createCaller} from "lib/trpc/server"

export interface GetPostParams {
  date: string
  name: string
}

export const getPost = createCaller(
  (trpc, {date, name}: GetPostParams) => trpc.post.getBySlug({
    slug: [date, name]
  })
)
