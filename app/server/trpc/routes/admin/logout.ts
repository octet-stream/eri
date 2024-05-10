import {redirect} from "@remix-run/node"
import {z} from "zod"

import {procedure} from "../../procedures/public.js"

import {parseCookie, removeCookie} from "../../../lib/auth/cookie.js"
import {lucia} from "../../../lib/auth/lucia.js"

export const logout = procedure
  .output(z.instanceof(Response))
  .mutation(async ({ctx: {req}}) => {
    const sessionId = await parseCookie(req.headers.get("cookie"))

    if (!sessionId) {
      return redirect("/admin", {
        status: 401
      })
    }

    await lucia.invalidateSession(sessionId)

    return redirect("/admin", {
      headers: {
        "set-cookie": await removeCookie()
      }
    })
  })
