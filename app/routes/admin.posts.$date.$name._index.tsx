import {generatePath} from "react-router"

import {Post} from "../server/db/entities.js"
import {
  type AdminLoaderArgs,
  defineAdminLoader
} from "../server/lib/admin/defineAdminLoader.js"
import {checkPostPks} from "../server/lib/utils/checkPostPks.js"
import {PostOutputView} from "../server/zod/post/PostOutputView.js"
import {PostSlug} from "../server/zod/post/PostSlug.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"

import type {Route} from "./+types/admin.posts.$date.$name._index.js"

export const loader = defineAdminLoader(
  async (event: AdminLoaderArgs<Route.LoaderArgs>) => {
    const {
      params,
      context: {orm}
    } = event

    const slug = await parseInput(PostSlug, params, {async: true})

    await checkPostPks({
      event,
      slug,
      onRedirect: ({post}) =>
        generatePath("/admin/posts/:slug", {slug: post.slug})
    })

    const post = await orm.em.findOneOrFail(
      Post,

      {
        slug
      },

      {
        filters: false, // Admin can see all posts
        populate: ["content"],
        failHandler(): never {
          throw new Response(null, {
            status: 404,
            statusText: "Unable to find post"
          })
        }
      }
    )

    return parseOutput(PostOutputView, post, {async: true})
  }
)

export const meta: Route.MetaFunction = ({data}) => [
  {
    title: data.title
  }
]

// Re-exporting component from public page, because they're identical. This will be changed in a future.
export {default} from "./_blog.posts.$date.$name.jsx"
