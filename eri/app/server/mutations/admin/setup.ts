import {makeDomainFunction} from "domain-functions"

import {AdminSetupInput} from "../../zod/user/AdminSetupInput.js"
import {serializeCookie} from "../../lib/auth/cookie.js"
import {lucia} from "../../lib/auth/lucia.js"
import {withOrm} from "../../lib/db/orm.js"
import {User} from "../../db/entities.js"

/**
 * Creates admin account
 */
export const setup = makeDomainFunction(AdminSetupInput)(
  withOrm(async (orm, input) => {
    const user = new User(input)

    await orm.em.persistAndFlush(user)

    const session = await lucia.createSession(user.id, {})
    const cookie = await serializeCookie(session.id)

    return new Headers([["set-cookie", cookie]])
  })
)
