import {PostsPageOutput} from "server/trpc/type/output/PostsPageOutput"
import {PageInput} from "server/trpc/type/input/PageInput"
import {PageArgs} from "server/trpc/helper/PageArgs"
import {Page} from "server/trpc/helper/Page"
import {Post} from "server/db/entity/Post"
import {getORM} from "server/lib/db"

import {procedure} from "server/trpc/procedure/base"

/**
 * Returns a page of posts, 50 per each page.
 */
export const all = procedure
  .input(PageInput)
  .output(PostsPageOutput)
  .query(async ({input}) => {
    const args = new PageArgs(input)
    const orm = await getORM()

    const [items, rows] = await orm.em.findAndCount(Post, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {createdAt: "desc"},
      fields: ["id", "createdAt", "updatedAt", "title", "slug", "author"]
    })

    return new Page({items, rows, args})
  })
