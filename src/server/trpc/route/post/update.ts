import {TRPCError} from "@trpc/server"
import {wrap} from "@mikro-orm/core"

import {procedure} from "server/trpc/procedure/authorized"
import {notFound} from "server/trpc/error/notFound"

import {PostOutput} from "server/trpc/type/output/PostOutput"
import {PostUpdateInput} from "server/trpc/type/input/PostUpdateInput"
import {Post} from "server/db/entity"

/**
 * Updates post with given `id`
 */
export const update = procedure
  .input(PostUpdateInput)
  .output(PostOutput)
  .mutation(async ({input, ctx: {orm, user, revalidate}}) => {
    const {id, ...fields} = input

    const post = await orm.em.findOneOrFail(Post, {id}, {
      failHandler: notFound
    })

    if (post.author.id !== user.id) {
      throw new TRPCError({code: "FORBIDDEN"})
    }

    wrap(post).assign(fields)

    await orm.em.flush()

    revalidate(`/post/${post.slug}`)
    revalidate("/")

    return post
  })
