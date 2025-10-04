import {href, redirect} from "react-router"

import {ormContext} from "../server/contexts/orm.ts"
import {Post} from "../server/db/entities.ts"
import {withAdmin} from "../server/lib/admin/withAdmin.ts"
import {PostSlug} from "../server/zod/post/PostSlug.ts"
import {parseInput} from "../server/zod/utils/parseInput.ts"

import type {Route} from "./+types/admin.posts.$date.$name.remove.ts"

export const action = withAdmin(async ({context, params}: Route.ActionArgs) => {
  const slug = await parseInput(PostSlug, params, {async: true})

  const orm = context.get(ormContext)

  const post = await orm.em.findOneOrFail(Post, {slug})

  // Mark post as removed
  post.removedAt = new Date()

  await orm.em.flush()

  throw redirect(href("/admin"))
})
