import {parseWithZod} from "@conform-to/zod/v4"
import {data, href, redirect} from "react-router"

import {ormContext} from "../server/contexts/orm.ts"
import {Post} from "../server/db/entities.ts"
import {AdminPostRemoveInput} from "../server/zod/admin/AdminPostRemoveInput.ts"
import type {Route} from "./+types/admin.posts.$date.$name.remove.ts"

/**
 * Removes a post matching it's current `slug`.
 *
 * The `slug` parameter is extracted from the url automatically
 */
export const action = async ({context, params, request}: Route.ActionArgs) => {
  const form = await request.formData()

  form.set("slug.date", params.date)
  form.set("slug.name", params.name)

  const submission = await parseWithZod(form, {
    schema: AdminPostRemoveInput,
    async: true
  })

  if (submission.status !== "success") {
    throw data(submission.reply(), 422)
  }

  const {permanent, slug} = submission.value

  const orm = context.get(ormContext)
  const post = await orm.em.findOne(Post, {slug})

  if (!post) {
    throw data(
      submission.reply({
        formErrors: ["Unable to find post"]
      }),

      {
        status: 422,
        statusText: "Unable to find post"
      }
    )
  }

  // The post can be removed permanently if this parameter is set to true, otherwise falling back to the default behaviour (soft removal)
  if (permanent) {
    orm.em.remove(post)
  } else {
    post.removedAt = new Date()
  }

  await orm.em.flush()

  throw redirect(href("/admin"))
}
