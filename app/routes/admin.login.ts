import type {ActionFunction} from "@remix-run/node"
import {json, redirect} from "@remix-run/react"
import {performMutation} from "remix-forms"

import {mutations} from "../server/mutations.js"
import {AdminLogInInput} from "../server/zod/user/AdminLogInInput.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action: ActionFunction = async ({request}) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response(null, {
      status: 405
    })
  }

  const result = await performMutation({
    request,
    schema: AdminLogInInput,
    mutation: mutations.admin.logIn
  })

  if (!result.success) {
    throw json(result)
  }

  if (!(result.data instanceof Headers)) {
    throw new Response(null, {
      status: 500,
      statusText: "Unable to set cookie for current user session"
    })
  }

  return redirect("/admin", {
    headers: result.data
  })
}
