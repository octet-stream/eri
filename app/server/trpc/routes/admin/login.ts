import {redirect} from "@remix-run/node"
import {z} from "zod"

import {procedure} from "../../procedures/public.js"

import {AdminLogInInput} from "../../../zod/user/AdminLogInInput.js"
import {serializeCookie} from "../../../lib/auth/cookie.js"
import {password} from "../../../lib/auth/password.js"
import {lucia} from "../../../lib/auth/lucia.js"
import {User} from "../../../db/entities.js"

export const login = procedure
  .input(AdminLogInInput)
  .output(z.instanceof(Response))
  .mutation(async ({input, ctx: {orm}}) => {
    const user = await orm.em.findOneOrFail(User, {email: input.email}, {
      populate: ["password"],
      failHandler() {
        throw new Response(null, {
          status: 404
        })
      }
    })

    if (!(await password.verify(user.password, input.password))) {
      throw new Response(null, {
        status: 401
      })
    }

    const session = await lucia.createSession(user.id, {})
    const cookie = await serializeCookie(session.id)

    return redirect("/admin", {
      headers: {
        "set-cookie": cookie
      }
    })
  })
