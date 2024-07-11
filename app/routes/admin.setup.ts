import {json, redirect, type ActionFunction} from "@remix-run/node"
import {performMutation} from "remix-forms"

import {AdminSetupInput} from "../server/zod/user/AdminSetupInput.js"
import {mutations} from "../server/mutations.js"

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
    schema: AdminSetupInput,
    mutation: mutations.admin.setup
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
