import {AuthChecker} from "type-graphql"

const authChecker: AuthChecker<any> = ({context}) => {
  if (!context.session.userId) {
    return false
  }

  // TODO: Add an extended logic for checking user's basic privileges
  return true
}

export default authChecker
