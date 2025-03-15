import type {unstable_MiddlewareFunction as MiddlewareFunction} from "react-router"
import {generatePath, replace} from "react-router"

import {matchesContext} from "../../contexts/matches.js"
import {ormContext} from "../../contexts/orm.js"

import {PostPrevKnownSlug} from "../../db/entities.js"
import {PostSlug} from "../../zod/post/PostSlug.js"

import {getCurrentRoteFromMatches} from "../../lib/utils/routes.js"
import {slugToParams} from "../../lib/utils/slug.js"

const valid = ["admin", "_blog"]
  .map(prefix => `${prefix}.posts.$date.$name`)
  .map(id => `routes/${id}`)

const isApplicable = (value?: string) => valid.some(id => value?.startsWith(id))

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
