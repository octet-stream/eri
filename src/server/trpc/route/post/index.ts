import {router} from "server/trpc/def"

import getBySlug from "./getBySlug"
import create from "./create"
import update from "./update"

const post = router({
  getBySlug,
  create,
  update
})

export default post
