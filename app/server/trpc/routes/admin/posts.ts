import {router} from "../../trpc.js"

import {create} from "./posts/create.js"

export const posts = router({
  create
})
