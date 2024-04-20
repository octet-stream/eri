import {z} from "zod"

import {PostBaseOutput} from "../../../zod/post/PostBaseOutput.js"
import {withOrm} from "../../middlewares/withOrm.js"
import {Post} from "../../../db/entities.js"
import {procedure} from "../../trpc.js"

export const getList = procedure
  .use(withOrm)
  .output(z.object({ // TODO: Add pagination utilities and types
    count: z.number().positive().int(),
    list: z.array(PostBaseOutput)
  }))
  .query(async ({ctx: {orm}}) => {
    const [list, count] = await orm.em.findAndCount(Post, {}, {
      orderBy: {
        createdAt: "asc"
      }
    })

    return {list, count}
  })
