import {data} from "react-router"

import {Post} from "../server/db/entities.js"
import {withAdmin} from "../server/lib/admin/withAdmin.js"
import {slugToParams} from "../server/lib/utils/slug.js"
import {PostOutputView} from "../server/zod/post/PostOutputView.js"
import {PostSlug} from "../server/zod/post/PostSlug.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"

import {ormContext} from "../server/contexts/orm.js"

import type {Route} from "./+types/admin.posts.$date.$name._index.js"

export const loader = withAdmin(async (event: Route.LoaderArgs) => {
  const {params, context} = event

  const orm = context.get(ormContext)

  const slug = await parseInput(PostSlug, params, {async: true})
  const post = await orm.em.findOneOrFail(
    Post,

    {
      slug
    },

    {
      filters: false, // Admin can see all posts
      populate: ["content"],
      failHandler(): never {
        throw data(null, {
          status: 404,
          statusText: "Unable to find post"
        })
      }
    }
  )

  return parseOutput(PostOutputView, post, {async: true})
})

export const meta: Route.MetaFunction = ({data}) => [
  {
    title: data.title
  }
]

// Re-exporting component from public page, because they're identical. This will be changed in a future.
export {default} from "./_blog.posts.$date.$name.jsx"
