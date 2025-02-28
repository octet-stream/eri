import {parseWithZod} from "@conform-to/zod"
import {data, replace} from "react-router"

import {APIError} from "better-auth/api"

import {AdminLogInInput} from "../../server/zod/admin/AdminLogInInput.js"

import type {Route} from "./+types/route.js"
import {AdminLoginPage} from "./AdminLoginPage.jsx"
import {ADMIN_LOGIN_PAGE_TITLE} from "./title.js"

export const loader = async ({request, context: {auth}}: Route.LoaderArgs) => {
  const response = await auth.api.getSession({
    headers: request.headers
  })

  if (response?.session) {
    throw replace("/admin")
  }

  return null
}

export const action = async ({request, context: {auth}}: Route.ActionArgs) => {
  const submission = await parseWithZod(await request.formData(), {
    schema: AdminLogInInput,
    async: true
  })

  if (submission.status !== "success") {
    return data(submission.reply(), 422)
  }

  try {
    const response = await auth.api.signInEmail({
      asResponse: true,
      body: submission.value
    })

    throw replace("/admin", {
      headers: response.headers
    })
  } catch (error) {
    if (!(error instanceof APIError)) {
      throw error
    }

    if (error.body.code === "INVALID_EMAIL_OR_PASSWORD") {
      return data(
        submission.reply({
          formErrors: ["Invalid email or password"]
        }),

        {
          status: 401
        }
      )
    }

    if (error.body.code === "INVALID_EMAIL") {
      return data(
        submission.reply({
          fieldErrors: {
            email: ["Invalid email"]
          }
        }),

        {
          status: 422
        }
      )
    }

    throw error
  }
}

export const meta: Route.MetaFunction = () => [
  {
    title: ADMIN_LOGIN_PAGE_TITLE
  }
]

export default AdminLoginPage
