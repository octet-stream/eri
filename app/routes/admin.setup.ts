import type {ActionFunction} from "@remix-run/node"

import {AdminSetupInput} from "../server/zod/user/AdminSetupInput.js"
import {formAction} from "../lib/utils/form-action.server.js"
import {mutations} from "../server/mutations.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action: ActionFunction = ({request}) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response(null, {
      status: 405
    })
  }

  return formAction({
    request,
    schema: AdminSetupInput,
    mutation: mutations.admin.setup,
    successPath: "/admin"
  })
}
