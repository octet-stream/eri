import {withOrm} from "../../middlewares/withOrm.js"
import {procedure} from "../../trpc.js"

import {Post} from "../../../db/entities.js"
import {PostOutput} from "../../../zod/post/PostOutput.js"
import {PostGetBySlugInput} from "../../../zod/post/PostGetBySlugInput.js"

export const getBySlug = procedure
  .use(withOrm)
  .input(PostGetBySlugInput)
  .output(PostOutput)
  .query(async ({input, ctx: {orm}}) => orm.em.findOneOrFail(
    Post,

    {
      slug: input.slug
    },

    {
      populate: ["content"],
      failHandler(): never {
        throw new Response(null, {
          status: 404,
          statusText: "Unable to find post"
        })
      }
    }
  ))
