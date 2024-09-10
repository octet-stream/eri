import type {
  MetaArgs_SingleFetch as MetaArgs,
  MetaDescriptor
} from "@remix-run/react"

import {type IPostSlug, PostSlug} from "../server/zod/post/PostSlug.js"
import {defineAdminLoader} from "../server/lib/admin/defineAdminLoader.server.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {PostOutput} from "../server/zod/post/PostOutput.js"
import {Post} from "../server/db/entities.js"

export const loader = defineAdminLoader(async ({params, context: {orm}}) => {
  const slug = await parseInput(PostSlug, params as IPostSlug, {async: true})

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

  return parseOutput(PostOutput, post, {async: true})
})

export const meta = ({data}: MetaArgs<typeof loader>): MetaDescriptor[] => [
  {
    title: data?.title
  }
]

// Re-exporting component from public page, because they're identical. This will be changed in a future.
export {default} from "./_blog.posts.$date.$name.jsx"
