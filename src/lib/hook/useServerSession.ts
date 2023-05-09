import {Session} from "next-auth"
import {useContext} from "react"

import {ServerSessionContext} from "lib/context/ServerSession/Context"

/**
 * Returns session from `ServerSessionContext`.
 */
export function useServerSession(): Session {
  const session = useContext(ServerSessionContext)

  if (session) {
    return session
  }

  throw new Error("Can't find ServerSessionContext")
}
