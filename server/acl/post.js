import {defineAbility} from "@casl/ability"

const createPostAbilities = user => defineAbility(can => {
  can("read")

  if (!user) {
    return undefined
  }

  can("manage", {userId: user.id})
})

export default createPostAbilities
