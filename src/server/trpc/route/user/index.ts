import {router} from "server/trpc/def"

import {createSuper} from "./createSuper"
import {create} from "./create"

export const user = router({
  createSuper,
  create,
})
