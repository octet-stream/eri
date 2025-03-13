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

// ! HAZARD WARNING: if middleware or loader/action throws non-response error, it will lead to some weird error in conjunction with the actual error, I need to report this to RR team
export const withCheckPostPks =
  (): MiddlewareFunction =>
  async ({context, request, params}, next) => {
    const orm = context.get(ormContext)
    const matches = context.get(matchesContext)
    const meta = getCurrentRoteFromMatches(matches, request.url)

    const slug = PostSlug.safeParse(params)

    if (!meta || !isApplicable(meta.route.id) || slug.success === false) {
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
