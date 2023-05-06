import {router} from "server/trpc/def"

import {list} from "./list"

export const posts = router({
  list
})
