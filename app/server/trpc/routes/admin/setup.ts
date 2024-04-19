import {redirect} from "@remix-run/node"
import {z} from "zod"

import {AdminSetupInput} from "../../../zod/user/AdminSetupInput.js"
import {serializeCookie} from "../../../lib/auth/cookie.js"
import {withOrm} from "../../middlewares/withOrm.js"
import {lucia} from "../../../lib/auth/lucia.js"
import {User} from "../../../db/entities.js"
import {procedure} from "../../trpc.js"

/**
 * Creates admin account
 */
export const setup = procedure
  .use(withOrm)
  .input(AdminSetupInput)
  .output(z.instanceof(Response))
  .mutation(async ({input, ctx: {orm}}) => {
    const [admin] = await orm.em.find(User, {}, {
      fields: ["id"],
      limit: 1,
      orderBy: {
        createdAt: "asc"
      }
    })

    // Disallow admin account setup if admin account already esists
    if (admin) {
      throw redirect("/admin", {
        status: 403 // Not sure what status code to return
      })
    }

    const user = new User(input)

    await orm.em.persistAndFlush(user)

    const session = await lucia.createSession(user.id, {})
    const cookie = await serializeCookie(session.id)

    return redirect("/admin", {
      headers: {
        "set-cookie": cookie
      }
    })
  })
