import {makeDomainFunction} from "domain-functions"

import {AdminSetupInput} from "../../zod/user/AdminSetupInput.js"
// import {User} from "../../db/entities.js"
import {withOrm} from "../../lib/db/orm.js"

export const adminSetup = makeDomainFunction(AdminSetupInput)(
  withOrm(async (_orm, input) => {
    console.log(input)
  })
)
