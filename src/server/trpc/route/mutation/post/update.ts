import {router, TRPCError} from "@trpc/server"
import {wrap} from "@mikro-orm/core"

import {getORM} from "server/lib/db"

import auth from "server/trpc/middleware/auth"
import ssrContextCheck from "server/trpc/middleware/ssrContextCheck"

import type {GlobalContext} from "server/trpc/context"

import {PostOutput} from "server/trpc/type/output/PostOutput"
import {PostUpdateInput} from "server/trpc/type/input/PostUpdateInput"
import {Post} from "server/db/entity"

const postUpdate = router<GlobalContext>()
  .middleware(ssrContextCheck)
  .middleware(auth)
  .mutation("update", {
    input: PostUpdateInput,

    output: PostOutput,

    async resolve({input, ctx}) {
      const {id, ...fields} = input
      const {user, res} = ctx

      const orm = await getORM()
      const post = await orm.em.findOne(Post, {id})

      if (!post) {
        throw new TRPCError({code: "NOT_FOUND"})
      }

      if (post.author.id !== user.id) {
        throw new TRPCError({code: "FORBIDDEN"})
      }

      wrap(post).assign(fields)

      await orm.em.persistAndFlush(post)
      await res.revalidate(`/post/${post.slug}`, {
        unstable_onlyGenerated: true
      })

      return post
    }
  })

export default postUpdate
