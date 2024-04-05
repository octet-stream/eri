import type {ActionFunctionArgs} from "@remix-run/node"
import {redirect} from "@remix-run/react"

import {withOrm} from "../server/lib/db/orm.js"
import {lucia} from "../server/lib/auth/lucia.js"
import {parseCookie, removeCookie} from "../server/lib/auth/cookie.js"

export const loader = withOrm(async (_, {request}: ActionFunctionArgs) => {
  const sessionId = await parseCookie(request.headers.get("cookie"))
  if (!sessionId) {
    throw redirect("/admin", {
      status: 401
    })
  }

  await lucia.invalidateSession(sessionId)

  return redirect("/admin", {
    headers: new Headers([["set-cookie", await removeCookie()]])
  })
})

export const action = (): never => {
  throw new Response(null, {
    status: 405
  })
}
