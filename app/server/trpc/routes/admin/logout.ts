import {redirect} from "@remix-run/node"
import {z} from "zod"

import {parseCookie, removeCookie} from "../../../lib/auth/cookie.js"
import {withOrm} from "../../middlewares/withOrm.js"
import {lucia} from "../../../lib/auth/lucia.js"
import {procedure} from "../../trpc.js"

export const logout = procedure
  .use(withOrm)
  .output(z.instanceof(Response))
  .mutation(async ({ctx: {req}}) => {
    const sessionId = await parseCookie(req.headers.get("cookie"))

    if (!sessionId) {
      throw redirect("/admin", {
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
