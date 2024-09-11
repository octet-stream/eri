import type {LoaderFunctionArgs, AppLoadContext} from "@remix-run/node"
import {replace} from "@remix-run/node"

import {PostSlug, type IPostSlug} from "../zod/post/PostSlug.js"
import {parseInput} from "../zod/utils/parseInput.js"
import {PostPrevKnownSlug} from "../db/entities.js"

type CheckPksLoaderArgs = LoaderFunctionArgs & {
  context: AppLoadContext & {
    pksRedirect: (slug: string) => string
  }
}

export const checkPksLoader = async ({
  request,
  params,
  context: {orm, pksRedirect}
}: CheckPksLoaderArgs) => {
  const slug = await parseInput(PostSlug, params as unknown as IPostSlug, {
    async: true
  })

  const pks = await orm.em.findOne(
    PostPrevKnownSlug,

    {
      slug
    },

    {
      fields: ["id", "post.slug"]
    }
  )

  if (pks) {
    const url = new URL(pksRedirect(pks.post.slug), request.url).pathname

    // Redirect using Moved Permanently response status + `replace` utility for client-side navigation when possible
    throw replace(url, 301)
  }
}
