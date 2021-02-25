import {AuthChecker} from "type-graphql"

import ApiContext from "type/api/Context"

const authChecker: AuthChecker<ApiContext> = ({context}) => {
  if (!context.req.session.userId) {
    return false
  }

  // TODO: Add an extended logic for checking user's basic privileges
  return true
}

export default authChecker
