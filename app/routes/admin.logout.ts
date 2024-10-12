import {type LoaderFunctionArgs, replace} from "@remix-run/node"

import {parseCookie, removeCookie} from "../server/lib/auth/cookie.js"
import {lucia} from "../server/lib/auth/lucia.js"

export const loader = async ({request}: LoaderFunctionArgs): Promise<never> => {
  const sessionId = await parseCookie(request.headers.get("cookie"))

  if (!sessionId) {
    throw replace("/admin", {
      status: 401
    })
  }

  await lucia.invalidateSession(sessionId)

  throw replace("/admin", {
    headers: {
      "set-cookie": await removeCookie()
    }
  })
}

export const action = (): never => {
  throw new Response(null, {
    status: 405
  })
}
