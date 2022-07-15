import {router, TRPCError} from "@trpc/server"
import {z} from "zod"

import type {Context} from "server/trpc/context"
import {Post} from "server/db/entity"
import {getORM} from "server/lib/db"

export default router<Context>()
  .query("getBySlug", {
    input: z.object({
      slug: z.string()
    }),

    output: z.instanceof(Post),

    async resolve({input}) {
      const orm = await getORM()
      const post = await orm.em.findOne(Post, {slug: input.slug})

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Can't find a post"
        })
      }

      return post
    }
  })
