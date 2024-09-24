import type {MetaArgs, MetaDescriptor} from "@remix-run/react"
import {generatePath} from "@remix-run/react"

import {checkPksLoader} from "../server/loaders/checkPksLoader.js"
import {type IPostSlug, PostSlug} from "../server/zod/post/PostSlug.js"
import {defineAdminLoader} from "../server/lib/admin/defineAdminLoader.js"
import {PostOutputView} from "../server/zod/post/PostOutputView.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {Post} from "../server/db/entities.js"

export const loader = defineAdminLoader(async event => {
  await checkPksLoader({
    ...event,

    context: {
      ...event.context,

      pksRedirect: slug => generatePath("/admin/posts/:slug", {slug})
    }
  })

  const {
    params,
    context: {orm}
  } = event

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

  return parseOutput(PostOutputView, post, {async: true})
})

export const meta = ({data}: MetaArgs<typeof loader>): MetaDescriptor[] => [
  {
    title: data?.title
  }
]

// Re-exporting component from public page, because they're identical. This will be changed in a future.
export {default} from "./_blog.posts.$date.$name.jsx"
