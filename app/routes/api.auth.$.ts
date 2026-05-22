import {authContext} from "#app/server/contexts/auth.ts"

import type {Route} from "./+types/api.auth.$.ts"

function getAuthHandler({
  request,
  context
}: Route.LoaderArgs | Route.ActionArgs) {
  const auth = context.get(authContext)

  return auth.handler(request)
}

export const loader = (event: Route.LoaderArgs) => getAuthHandler(event)

export const action = (event: Route.ActionArgs) => getAuthHandler(event)
