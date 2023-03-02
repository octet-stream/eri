import {PostsPageOutput} from "server/trpc/type/output/PostsPageOutput"
import {PostsPageInput} from "server/trpc/type/input/PostsPageInput"
import {Post} from "server/db/entity/Post"
import {getORM} from "server/lib/db/orm"

import {procedure} from "server/trpc/procedure/base"

/**
 * Returns a page of posts, 50 per each page.
 */
export const all = procedure
  .input(PostsPageInput)
  .output(PostsPageOutput)
  .query(async ({input}) => {
    const {args} = input

    const orm = await getORM()

    const [items, count] = await orm.em.findAndCount(Post, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {createdAt: "desc"},
      fields: ["id", "createdAt", "updatedAt", "title", "slug", "author"]
    })

    return {items, count, args}
  })
