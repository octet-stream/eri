import {parseWithZod} from "@conform-to/zod/v4"
import {data, replace} from "react-router"

import {authContext} from "../../server/contexts/auth.ts"
import {AdminLogInInput} from "../../server/zod/admin/AdminLogInInput.ts"

import type {Route} from "./+types/route.ts"
import {AdminLoginPage} from "./AdminLoginPage.tsx"
import {ADMIN_LOGIN_PAGE_TITLE} from "./title.ts"

export const loader = async ({request, context}: Route.LoaderArgs) => {
  const auth = context.get(authContext)

  const response = await auth.api.getSession({
    headers: request.headers
  })

  if (response?.session) {
    throw replace("/admin")
  }

  return null
}

export const action = async ({request, context}: Route.ActionArgs) => {
  const auth = context.get(authContext)

  const submission = await parseWithZod(await request.formData(), {
    schema: AdminLogInInput,
    async: true
  })

  if (submission.status !== "success") {
    return data(submission.reply(), 422)
  }

  const response = await auth.api.signInEmail({
    asResponse: true,
    body: submission.value
  })

  if (response.status === 200) {
    throw replace("/admin", {
      headers: response.headers
    })
  }

  if (response.status !== 401) {
    throw response
  }

  const body = (await response.json()) as {code: string; message: string}

  if (body.code === "INVALID_EMAIL_OR_PASSWORD") {
    return data(
      submission.reply({
        formErrors: ["Invalid email or password"]
      }),

      401
    )
  }

  if (body.code === "INVALID_EMAIL") {
    return data(
      submission.reply({
        fieldErrors: {
          email: ["Ivalid email"]
        }
      })
    )
  }

  if (body.code === "INVALID_PASSWORD") {
    return data(
      submission.reply({
        fieldErrors: {
          passowrd: ["Invalid password"]
        }
      })
    )
  }

  throw response
}

export const meta: Route.MetaFunction = () => [
  {
    title: ADMIN_LOGIN_PAGE_TITLE
  }
]

export default AdminLoginPage
