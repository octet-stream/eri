import {
  replace,
  json,
  unstable_defineLoader as defineLoader,
  unstable_defineAction as defineAction
} from "@remix-run/node"
import {parseWithZod} from "@conform-to/zod"

import {User} from "../server/db/entities.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {serializeCookie} from "../server/lib/auth/cookie.js"
import {AdminSetupInput} from "../server/zod/admin/AdminSetupInput.js"

export const loader = defineLoader((): never => {
  throw new Response(null, {
    status: 404
  })
})

export const action = defineAction(async ({request, context: {orm}}) => {
  const submission = await parseWithZod(await request.formData(), {
    schema: AdminSetupInput,
    async: true
  })

  if (submission.status !== "success") {
    return json(submission.reply()) // ! See https://github.com/edmundhung/conform/issues/628
  }

  const user = orm.em.create(User, submission.value)

  await orm.em.persistAndFlush(user)

  const session = await lucia.createSession(user.id, {})
  const cookie = await serializeCookie(session.id)

  throw replace("/admin", {
    headers: {
      "set-cookie": cookie
    }
  })
})
