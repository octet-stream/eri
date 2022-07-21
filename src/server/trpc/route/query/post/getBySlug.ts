import {router, TRPCError} from "@trpc/server"
import {partialRight} from "lodash"
import {z} from "zod"

import isDate from "validator/lib/isDate"

import {PostOutput} from "server/trpc/type/output/PostOutput"
import type {Context} from "server/trpc/context"
import {Post} from "server/db/entity"
import {getORM} from "server/lib/db"

/**
 * Returns a single post that matches given slug
 */
const getBySlug = router<Context>()
  .query("getBySlug", {
    input: z.object({
      slug: z.tuple([
        z.string().refine(partialRight(isDate, {format: "YYYY-MM-DD"})),
        z.string().min(1).regex(/^[a-z0-9-_]+$/)
      ])
    }),

    output: PostOutput,

    async resolve({input}) {
      const orm = await getORM()
      const post = await orm.em.findOne(Post, {slug: input.slug.join("/")})

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Can't find a post"
        })
      }

      return post
    }
  })

export default getBySlug
