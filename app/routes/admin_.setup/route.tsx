import {parseWithZod} from "@conform-to/zod"
import {replace, data} from "react-router"

import {User} from "../../server/db/entities.js"
import {serializeCookie} from "../../server/lib/auth/cookie.js"
import {lucia} from "../../server/lib/auth/lucia.js"
import {AdminSetupInput} from "../../server/zod/admin/AdminSetupInput.js"

import type {Route} from "./+types/route.js"
import {AdminSetupPage} from "./AdminSetupPage.jsx"

export const loader = ({context: {auth}}: Route.LoaderArgs) => {
  if (auth.isAuthenticated()) {
    throw replace("/admin")
  }

  return null
}

export const action = async ({request, context: {orm}}: Route.ActionArgs) => {
  const submission = await parseWithZod(await request.formData(), {
    schema: AdminSetupInput,
    async: true
  })

  if (submission.status !== "success") {
    return data(submission.reply(), {
      status: 400
    })
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
}

export const meta: Route.MetaFunction = () => [
  {
    title: "Create admin account"
  }
]

export default AdminSetupPage
