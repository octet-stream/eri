import {router} from "@trpc/server"

import {Post} from "server/db/entity/Post"
import {PostCreateInput} from "server/trpc/type/input/PostCreateInput"
import {PostOutput} from "server/trpc/type/output/PostOutput"
import type {GlobalContext} from "server/trpc/context"
import {getORM} from "server/lib/db"

import auth from "server/trpc/middleware/auth"
import ssrContextCheck from "server/trpc/middleware/ssrContextCheck"

/**
 * Creates a new post
 */
const postCreate = router<GlobalContext>()
  .middleware(ssrContextCheck)
  .middleware(auth)
  .mutation("create", {
    input: PostCreateInput,

    output: PostOutput,

    async resolve({ctx, input}) {
      const orm = await getORM()
      const post = new Post({...input, author: ctx.user})

      // Save a new post, then revalidate homepage
      await orm.em.persistAndFlush(post)
      await Promise.allSettled([
        ctx.res.revalidate("/"),
        ctx.res.revalidate(`/post/${post.slug}`, {unstable_onlyGenerated: true})
      ])

      return post
    }
  })

export default postCreate
