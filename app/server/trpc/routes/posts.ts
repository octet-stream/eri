import {router} from "../trpc.js"

import {getList} from "./posts/getList.js"
import {getBySlug} from "./posts/getBySlug.js"

export const posts = router({
  getList,
  getBySlug
})
