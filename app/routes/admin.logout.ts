import {data, replace} from "react-router"

import type {Route} from "./+types/admin.logout.js"

export const loader = async ({
  request,
  context: {auth}
}: Route.LoaderArgs): Promise<never> => {
  const response = await auth.api.signOut({
    asResponse: true,
    headers: request.headers
  })

  throw replace("/admin", {
    headers: response.headers
  })
}

export const action = (): never => {
  throw data(null, {
    status: 405
  })
}
