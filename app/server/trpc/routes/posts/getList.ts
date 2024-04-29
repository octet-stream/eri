import {withOrm} from "../../middlewares/withOrm.js"
import {Post} from "../../../db/entities.js"
import {procedure} from "../../trpc.js"

import {PostListInput} from "../../../zod/post/PostListInput.js"
import {PostListOutput} from "../../../zod/post/PostListOutput.js"

export const getList = procedure
  .use(withOrm)
  .input(PostListInput)
  .output(PostListOutput)
  .query(async ({input: {args}, ctx: {orm}}) => {
    const [items, count] = await orm.em.findAndCount(Post, {}, {
      limit: args.limit,
      offset: args.offset,
      orderBy: {
        createdAt: "asc"
      }
    })

    return {items, count, args}
  })
