import {parseWithZod} from "@conform-to/zod/v4"
import {data, href, redirect} from "react-router"

import {ormContext} from "../server/contexts/orm.ts"
import {Post} from "../server/db/entities.ts"
import {withAdmin} from "../server/lib/admin/withAdmin.ts"
import {AdminPostRemoveInput} from "../server/zod/admin/AdminPostRemoveInput.ts"
import type {Route} from "./+types/admin.posts.$date.$name.remove.ts"

export const action = withAdmin(
  async ({context, params, request}: Route.ActionArgs) => {
    const form = await request.formData()

    Object.entries(params).forEach(([key, value]) => void form.set(key, value))

    const submission = await parseWithZod(form, {
      schema: AdminPostRemoveInput,
      async: true
    })

    if (submission.status !== "success") {
      throw data(submission.reply(), 422)
    }

    const orm = context.get(ormContext)
    const post = await orm.em.findOneOrFail(Post, {slug: submission.value.slug})

    // The post can be removed permanently if this parameter is set to true, otherwise falling back to the default behaviour (soft removal)
    if (submission.value.permanent) {
      orm.em.remove(post)
    } else {
      post.removedAt = new Date()
    }

    await orm.em.flush()

    throw redirect(href("/admin"))
  }
)
