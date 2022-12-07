import {router} from "server/trpc/def"

import all from "./all"

const posts = router({
  all
})

export default posts
