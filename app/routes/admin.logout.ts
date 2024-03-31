import type {ActionFunctionArgs} from "@remix-run/node"
import {redirect} from "@remix-run/react"

import {withOrm} from "../server/lib/db/orm.js"
import {lucia} from "../server/lib/auth/lucia.js"

export const loader = (): never => {
  throw new Response(null, {
    status: 404
  })
}

export const action = withOrm(async (_, {request}: ActionFunctionArgs) => {
  if (request.method.toLowerCase() !== "post") {
    throw new Response(null, {
      status: 405
    })
  }

  const cookies = request.headers.get("cookies")
  if (!cookies) {
    throw new Response(null, {
      status: 401
    })
  }

  const sessionId = lucia.readSessionCookie(cookies)
  if (!sessionId) {
    throw new Response(null, {
      status: 401
    })
  }

  await lucia.invalidateSession(sessionId)

  return redirect("/admin")
})
