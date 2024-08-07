import {redirect, type ActionFunction} from "@remix-run/node"
import {parseWithZod} from "@conform-to/zod"

import {AdminLogInInput} from "../server/zod/user/AdminLogInInput.js"
import {serializeCookie} from "../server/lib/auth/cookie.js"
import {password} from "../server/lib/auth/password.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {User} from "../server/db/entities.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action: ActionFunction = async ({request, context: {orm}}) => {
  const submission = await parseWithZod(await request.formData(), {
    schema: AdminLogInInput,
    async: true
  })

  if (submission.status !== "success") {
    return submission.reply()
  }

  const user = await orm.em.findOneOrFail(
    User,

    {
      email: submission.value.email
    },

    {
      populate: ["password"],
      failHandler() {
        throw redirect("/admin", {
          status: 404
        })
      }
    }
  )

  if (!(await password.verify(user.password, submission.value.password))) {
    throw redirect("/admin", {
      status: 401
    })
  }

  const session = await lucia.createSession(user.id, {})
  const cookie = await serializeCookie(session.id)

  return redirect("/admin", {
    headers: {
      "set-cookie": cookie
    }
  })
}
