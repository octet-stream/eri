import {parseWithZod} from "@conform-to/zod"
import {data, replace} from "react-router"

import {authContext} from "../../server/contexts/auth.ts"
import {AdminSetupInput} from "../../server/zod/admin/AdminSetupInput.ts"

import type {Route} from "./+types/route.ts"
import {AdminSetupPage} from "./AdminSetupPage.tsx"
import {ADMIN_SETUP_PAGE_TITLE} from "./title.ts"

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
