import {replace} from "react-router"

import type {ContextFix} from "../server/lib/types/ContextFix.js"

import type {Route} from "./+types/admin.logout.js"

export const action = async ({
  request,
  context: {auth}
}: ContextFix<Route.ActionArgs>): Promise<never> => {
  const response = await auth.api.signOut({
    asResponse: true,
    headers: request.headers
  })

  throw replace("/admin", {
    headers: response.headers
  })
}
