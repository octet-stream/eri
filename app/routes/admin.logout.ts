import {replace} from "react-router"

import {authContext} from "../server/contexts/auth.ts"
import type {Route} from "./+types/admin.logout.ts"

export const action = async ({
  request,
  context
}: Route.ActionArgs): Promise<never> => {
  const auth = context.get(authContext)

  const response = await auth.api.signOut({
    asResponse: true,
    headers: request.headers
  })

  throw replace("/admin", {
    headers: response.headers
  })
}
