import {redirect, type ActionFunction} from "@remix-run/node"
import {parseWithZod} from "@conform-to/zod"

import {AdminSetupInput} from "../server/zod/user/AdminSetupInput.js"
import {serializeCookie} from "../server/lib/auth/cookie.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {getOrm} from "../server/lib/db/orm.js"
import {User} from "../server/db/entities.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action: ActionFunction = async ({request}) => {
  const submission = await parseWithZod(await request.formData(), {
    async: true,
    schema: AdminSetupInput
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const orm = await getOrm()
  const user = new User(submission.value)

  await orm.em.persistAndFlush(user)

  const session = await lucia.createSession(user.id, {})
  const cookie = await serializeCookie(session.id)

  return redirect("/admin", {
    headers: {
      "set-cookie": cookie
    }
  })
}
