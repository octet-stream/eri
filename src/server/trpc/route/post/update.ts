import {TRPCError} from "@trpc/server"
import {wrap} from "@mikro-orm/core"

import {getORM} from "server/lib/db"

import procedure from "server/trpc/procedure/authorized"

import {PostOutput} from "server/trpc/type/output/PostOutput"
import {PostUpdateInput} from "server/trpc/type/input/PostUpdateInput"
import {Post} from "server/db/entity"

const postUpdate = procedure
  .input(PostUpdateInput)
  .output(PostOutput)
  .mutation(async ({input, ctx}) => {
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

    await orm.em.flush()
    await res.revalidate(`/post/${post.slug}`, {
      unstable_onlyGenerated: true
    })

    return post
  })

export default postUpdate
