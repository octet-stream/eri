import {replace} from "react-router"

import type {Route} from "./+types/admin.logout.js"

export const action = async ({
  request,
  context: {auth}
}: Route.ActionArgs): Promise<never> => {
  const response = await auth.api.signOut({
    asResponse: true,
    headers: request.headers
  })

  throw replace("/admin", {
    headers: response.headers
  })
}
