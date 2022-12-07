import {router} from "server/trpc/def"

import createSuper from "./createSuper"
import create from "./create"

const user = router({
  createSuper,
  create,
})

export default user
