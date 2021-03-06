import {AuthChecker} from "type-graphql"

import ApiContext from "server/type/Context"

const authChecker: AuthChecker<ApiContext> = ({context}) => {
  if (!context.req.session.userId) {
    return false
  }

  // TODO: Add an extended logic for checking user's basic privileges
  return true
}

export default authChecker
