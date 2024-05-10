import type {ActionFunctionArgs} from "@remix-run/node"

import {withTrpc} from "../server/trpc/withTrpc.js"
import {IAdminLogInInput} from "../server/zod/user/AdminLogInInput.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action = withTrpc(async (trpc, {request}: ActionFunctionArgs) => {
  const input = Object.fromEntries(await request.formData()) as IAdminLogInInput

  return trpc.admin.login(input)
})
