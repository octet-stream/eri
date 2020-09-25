import {defineAbility} from "@casl/ability"

import Post from "server/model/Post"

/**
 * @param {import("server/model/User").default} user
 */
const createPostAbilities = user => defineAbility(can => {
  can("read", Post)

  if (!user) {
    return undefined
  }

  can("create", Post)
  can("manage", Post, {userId: user.id})
})

export default createPostAbilities
