import type {ActionFunction} from "@remix-run/node"

import {AdminSetupInput} from "../server/zod/user/AdminSetupInput.js"
import {formAction} from "../lib/utils/form-action.server.js"
import {adminSetup} from "../server/mutations/admin/setup.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action: ActionFunction = ({request}) => formAction({
  request,
  schema: AdminSetupInput,
  mutation: adminSetup,
  successPath: "/admin"
})
