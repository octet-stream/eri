import {auth} from "../server/lib/auth/auth.ts"

import type {Route} from "./+types/api.auth.$.ts"

export const loader = ({request}: Route.LoaderArgs) => auth.handler(request)

export const action = ({request}: Route.ActionArgs) => auth.handler(request)
