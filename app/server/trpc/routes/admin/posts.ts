import {router} from "../../trpc.js"

import {create} from "./posts/create.js"
import {getList} from "./posts/getList.js"
import {getBySlug} from "./posts/getBySlug.js"

export const posts = router({
  create,
  getList,
  getBySlug
})
