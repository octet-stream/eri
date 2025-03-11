import type {Loaded} from "@mikro-orm/mariadb"
import {
  type LoaderFunctionArgs,
  type unstable_RouterContextProvider as RouterContextProvider,
  replace
} from "react-router"

import {serverContext} from "../../../server/contexts/server.js"
import {PostPrevKnownSlug} from "../../db/entities.js"
import type {OPostSlug} from "../../zod/post/PostSlug.js"
import type {Replace} from "../types/Replace.js"

export type CheckPksOnRedirectCallback = (
  pks: Loaded<PostPrevKnownSlug, never, "id" | "post.slug", never>
) => string

export interface CheckPostPksParams {
  event: Replace<LoaderFunctionArgs, {context: RouterContextProvider}>
  slug: OPostSlug
  onRedirect: CheckPksOnRedirectCallback
}

/**
 * Checks whether the `slug` matches any Post Previously Known Slug, and if so - redirects to the current address
 */
export async function checkPostPks({
  event,
  slug,
  onRedirect
}: CheckPostPksParams): Promise<void> {
  const {orm} = event.context.get(serverContext)

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
    // Redirect using Moved Permanently response status + `replace` utility for client-side navigation when possible
    throw replace(new URL(onRedirect(pks), event.request.url).pathname, 301)
  }
}
