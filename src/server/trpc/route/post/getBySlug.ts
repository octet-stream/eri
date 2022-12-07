import {TRPCError} from "@trpc/server"
import {z} from "zod"

import {PostOutput} from "server/trpc/type/output/PostOutput"
import {Slug} from "server/trpc/type/common/Slug"
import {Post} from "server/db/entity"
import {getORM} from "server/lib/db"

import {procedure} from "server/trpc/def"

const {isArray} = Array

/**
 * Returns a single post that matches given slug
 */
const getBySlug = procedure
  .input(z.object({slug: Slug}))
  .output(PostOutput)
  .query(async ({input}) => {
    const slug = isArray(input.slug) ? input.slug.join("/") : input.slug

    const orm = await getORM()
    const post = await orm.em.findOne(Post, {slug})

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Can't find a post"
      })
    }

    return post
  })

export default getBySlug
