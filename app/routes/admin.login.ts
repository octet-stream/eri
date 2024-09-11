import {replace, type ActionFunctionArgs} from "@remix-run/node"
import {parseWithZod} from "@conform-to/zod"

import {AdminLogInInput} from "../server/zod/admin/AdminLogInInput.js"
import {serializeCookie} from "../server/lib/auth/cookie.js"
import {password} from "../server/lib/auth/password.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {User} from "../server/db/entities.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action = async ({request, context: {orm}}: ActionFunctionArgs) => {
  const submission = await parseWithZod(await request.formData(), {
    schema: AdminLogInInput,
    async: true
  })

  if (submission.status !== "success") {
    return submission.reply() // ! See https://github.com/edmundhung/conform/issues/628
  }

  const user = await orm.em.findOneOrFail(
    User,

    {
      email: submission.value.email
    },

    {
      populate: ["password"],
      failHandler() {
        throw replace("/admin", {
          status: 404
        })
      }
    }
  )

  if (!(await password.verify(user.password, submission.value.password))) {
    throw replace("/admin", {
      status: 401
    })
  }

  const session = await lucia.createSession(user.id, {})
  const cookie = await serializeCookie(session.id)

  throw replace("/admin", {
    headers: {
      "set-cookie": cookie
    }
  })
}
