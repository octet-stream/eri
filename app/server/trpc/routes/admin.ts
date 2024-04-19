import {router} from "../trpc.js"

import {login} from "./admin/login.js"
import {logout} from "./admin/logout.js"
import {setup} from "./admin/setup.js"

export const admin = router({
  login,
  logout,
  setup
})
