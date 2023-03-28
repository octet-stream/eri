import {PostGetBySlugInput} from "server/trpc/type/input/PostGetBySlugInput"
import {PostOutput} from "server/trpc/type/output/PostOutput"

import {procedure} from "server/trpc/procedure/base"
import {notFound} from "server/trpc/error/notFound"

import {Post} from "server/db/entity"

/**
 * Returns a single post that matches given slug
 */
export const getBySlug = procedure
  .input(PostGetBySlugInput)
  .output(PostOutput)
  .query(async ({input, ctx: {orm}}) => {
    const post = await orm.em.findOneOrFail(Post, {slug: input.slug}, {
      failHandler: notFound
    })

    return post
  })

export default getBySlug
