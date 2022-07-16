import {router} from "@trpc/server"
import {z} from "zod"

import {Post} from "server/db/entity/Post"
import {PostCreateInput} from "server/trpc/type/input/PostCreateInput"
import type {GlobalContext} from "server/trpc/context"
import {getORM} from "server/lib/db"

import auth from "server/trpc/middleware/auth"
import ssrContextCheck from "server/trpc/middleware/ssrContextCheck"

export default router<GlobalContext>()
  .middleware(ssrContextCheck)
  .middleware(auth)
  .mutation("create", {
    input: PostCreateInput,

    output: z.instanceof(Post),

    async resolve({ctx, input}) {
      const orm = await getORM()
      const post = new Post({...input, author: ctx.user})

      // Save a new post, then revalidate homepage
      await orm.em.persistAndFlush(post)
      await ctx.res.revalidate("/")

      return post
    }
  })