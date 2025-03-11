import {replace} from "react-router"

import {serverContext} from "../server/contexts/server.js"
import type {Route} from "./+types/admin.logout.js"

export const action = async ({
  request,
  context
}: Route.ActionArgs): Promise<never> => {
  const {auth} = context.get(serverContext)

  const response = await auth.api.signOut({
    asResponse: true,
    headers: request.headers
  })

  throw replace("/admin", {
    headers: response.headers
  })
}
