import {router} from "server/trpc/def"

import {getBySlug} from "./getBySlug"

import {create} from "./create"
import {update} from "./update"

export const post = router({
  // Queries
  getBySlug,

  // Mutations
  create,
  update
})
