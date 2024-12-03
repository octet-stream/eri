import {parseWithZod} from "@conform-to/zod"
import {replace, data} from "react-router"

import {User} from "../../server/db/entities.js"
import {serializeCookie} from "../../server/lib/auth/cookie.js"
import {lucia} from "../../server/lib/auth/lucia.js"
import {password} from "../../server/lib/auth/password.js"
import {AdminLogInInput} from "../../server/zod/admin/AdminLogInInput.js"

import type {Route} from "./+types/route.js"
import {AdminLoginPage} from "./AdminLoginPage.jsx"

export const loader = ({context: {auth}}: Route.LoaderArgs) => {
  if (auth.isAuthenticated()) {
    throw replace("/admin")
  }

  return null
}

export const action = async ({request, context: {orm}}: Route.ActionArgs) => {
  const submission = await parseWithZod(await request.formData(), {
    schema: AdminLogInInput,
    async: true
  })

  if (submission.status !== "success") {
    return data(submission.reply(), {
      status: 400
    })
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

export const meta: Route.MetaFunction = () => [
  {
    title: "Login"
  }
]

export default AdminLoginPage
