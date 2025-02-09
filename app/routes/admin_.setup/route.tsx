import {parseWithZod} from "@conform-to/zod"
import {data, replace} from "react-router"

import {AdminSetupInput} from "../../server/zod/admin/AdminSetupInput.js"

import type {Route} from "./+types/route.js"
import {AdminSetupPage} from "./AdminSetupPage.jsx"
import {ADMIN_SETUP_PAGE_TITLE} from "./title.js"

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
    schema: AdminSetupInput,
    async: true
  })

  if (submission.status !== "success") {
    return data(submission.reply(), 422)
  }

  const response = await auth.api.signUpEmail({
    asResponse: true,
    body: {...submission.value, name: ""}
  })

  throw replace("/admin", {
    headers: response.headers
  })
}

export const meta: Route.MetaFunction = () => [
  {
    title: ADMIN_SETUP_PAGE_TITLE
  }
]

export default AdminSetupPage
