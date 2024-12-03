import {replace, type LoaderFunctionArgs} from "react-router"
import type {MikroORM, Loaded} from "@mikro-orm/mariadb"

import {PostPrevKnownSlug} from "../../db/entities.js"
import type {OPostSlug} from "../../zod/post/PostSlug.js"

interface CheckPostPksContext {
  orm: MikroORM
}

export type CheckPksOnRedirectCallback = (
  pks: Loaded<PostPrevKnownSlug, never, "id" | "post.slug", never>
) => string

export interface CheckPostPksParams {
  event: LoaderFunctionArgs
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
  const {orm} = event.context as CheckPostPksContext

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
