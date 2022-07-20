import {router} from "@trpc/server"

import {createPageOutput} from "server/trpc/type/output/PageOutput"
import {PostOutput} from "server/trpc/type/output/PostOutput"
import {PageInput} from "server/trpc/type/input/PageInput"
import {PageArgs} from "server/trpc/helper/PageArgs"
import type {Context} from "server/trpc/context"
import {Page} from "server/trpc/helper/Page"
import {Post} from "server/db/entity/Post"
import {getORM} from "server/lib/db"

// NOTE: Do not prefix this router.
export default router<Context>()
  .query("all", {
    input: PageInput,

    output: createPageOutput(PostOutput),

    async resolve({input}) {
      const args = new PageArgs(input)
      const orm = await getORM()

      const [items, total] = await orm.em.findAndCount(Post, {}, {
        limit: args.limit,
        offset: args.offset,
        orderBy: {createdAt: "ASC"}
      })

      return new Page({items, total, args})
    }
  })
