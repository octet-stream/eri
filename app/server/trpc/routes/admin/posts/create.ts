import {withAuth} from "../../../middlewares/withAuth.js"
import {procedure} from "../../../trpc.js"

import {Post} from "../../../../db/entities.js"
import {PostOutput} from "../../../../zod/post/PostOutput.js"
import {PostCreateInput} from "../../../../zod/post/PostCreateInput.js"

export const create = procedure
  .use(withAuth)
  .input(PostCreateInput)
  .output(PostOutput)
  .mutation(async ({input, ctx: {auth, orm}}) => {
    const post = new Post({...input, author: auth.viewer})

    await orm.em.persistAndFlush(post)

    return post
  })
