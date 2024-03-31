import {makeDomainFunction} from "domain-functions"

import {AdminLogInInput} from "../../zod/user/AdminLogInInput.js"
import {password} from "../../lib/auth/password.js"
import {lucia} from "../../lib/auth/lucia.js"
import {withOrm} from "../../lib/db/orm.js"
import {User} from "../../db/entities.js"

export const logIn = makeDomainFunction(AdminLogInInput)(
  withOrm(async (orm, input) => {
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

    const cookie = lucia.createSessionCookie(session.id)

    return new Headers([["Set-Cookie", cookie.serialize()]])
  })
)
