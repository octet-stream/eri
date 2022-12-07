import {PostCreateInput} from "server/trpc/type/input/PostCreateInput"
import {PostOutput} from "server/trpc/type/output/PostOutput"
import {Post} from "server/db/entity/Post"
import {getORM} from "server/lib/db"

import procedure from "server/trpc/procedure/authorized"

/**
 * Creates a new post
 */
const postCreate = procedure
  .input(PostCreateInput)
  .output(PostOutput)
  .mutation(async ({input, ctx}) => {
    const orm = await getORM()
    const post = orm.em.create(Post, {...input, author: ctx.user})

    // Save a new post, then revalidate homepage
    await orm.em.persistAndFlush(post)
    await ctx.res.revalidate(`/post/${post.slug}`, {
      unstable_onlyGenerated: true
    })

    return post
  })

export default postCreate
