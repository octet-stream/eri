import {procedure} from "../../../procedures/protected.js"

import {Post} from "../../../../db/entities.js"
import {PostOutput} from "../../../../zod/post/PostOutput.js"
import {PostCreateInput} from "../../../../zod/post/PostCreateInput.js"

export const create = procedure
  .input(PostCreateInput)
  .output(PostOutput)
  .mutation(async ({input, ctx: {auth, orm}}) => {
    const post = new Post({...input, author: auth.viewer})

    await orm.em.persistAndFlush(post)

    return post
  })
