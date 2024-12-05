import {auth} from "../server/lib/auth.js"

import type {Route} from "./+types/api.auth.$.js"

export const loader = ({request}: Route.LoaderArgs) => auth.handler(request)

export const action = ({request}: Route.ActionArgs) => auth.handler(request)
