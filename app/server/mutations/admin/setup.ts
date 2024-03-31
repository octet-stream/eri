import {makeDomainFunction} from "domain-functions"

import {AdminSetupInput} from "../../zod/user/AdminSetupInput.js"
import {User} from "../../db/entities.js"
import {withOrm} from "../../lib/db/orm.js"

/**
 * Creates admin account
 */
export const setup = makeDomainFunction(AdminSetupInput)(
  withOrm(async (orm, input) => {
    const user = new User(input)

    await orm.em.persistAndFlush(user)
  })
)
