import type {MiddlewareFunction} from "react-router"
import {generatePath, replace} from "react-router"

import {matchesContext} from "../../contexts/matches.ts"
import {ormContext} from "../../contexts/orm.ts"

import {PostPrevKnownSlug} from "../../db/entities.ts"
import {getCurrentRoteFromMatches} from "../../lib/utils/routes.ts"
import {slugToParams} from "../../lib/utils/slug.ts"
import {PostSlug} from "../../zod/post/PostSlug.ts"

const valid = ["admin", "_blog"]
  .map(prefix => `${prefix}.posts.$date.$name`)
  .map(id => `routes/${id}`)

const isApplicable = (value?: string) => valid.some(id => value?.startsWith(id))

/**
 * Checks whether the `slug` of the current requested post matches any Post Previously Known Slug,
 * and if so, it redirects to the current address using permanent HTTP redirect (with 301 status code) and RR `replace` utility.
 */
export const withCheckPostPks =
  (): MiddlewareFunction =>
  async ({context, request}, next) => {
    const orm = context.get(ormContext)
    const matches = context.get(matchesContext)
    const meta = getCurrentRoteFromMatches(matches, request.url)

    // Do nothing when current route is not part of /post/:date/:name or /admin/posts/:date/:name paths
    if (!meta || !isApplicable(meta.route.id)) {
      return next()
    }

    // Use safeParse so the route itself handles the error
    // Use params from metadata, just so we don't need to pass them in tests. This shouldn't be a problem, I think :)
    const slug = PostSlug.safeParse(meta.params)
    if (!slug.success) {
      return next()
    }

    const pks = await orm.em.findOne(
      PostPrevKnownSlug,

      {
        slug: slug.data
      },

      {
        fields: ["id", "post.slug"]
      }
    )

    if (pks) {
      // Redirect using Moved Permanently response status + `replace` utility for client-side navigation when possible
      throw replace(
        generatePath(meta.pattern, slugToParams(pks.post.slug)),

        301
      )
    }

    return next()
  }
