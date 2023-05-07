import {PostCreateInput} from "server/trpc/type/input/PostCreateInput"
import {PostOutput} from "server/trpc/type/output/PostOutput"
import {Post} from "server/db/entity/Post"

import {procedure} from "server/trpc/procedure/authorized"

/**
 * Creates a new post
 */
export const create = procedure
  .input(PostCreateInput)
  .output(PostOutput)
  .mutation(async ({input, ctx: {orm, user, revalidate}}) => {
    const post = orm.em.create(Post, {...input, author: user})

    // Save a new post, then revalidate homepage
    await orm.em.persistAndFlush(post)

    revalidate(`/post/${post.slug}`)
    revalidate("/")

    return post
  })
