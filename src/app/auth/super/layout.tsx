import {notFound} from "next/navigation"
import type {ReactNode} from "react"
import {Fragment, createElement} from "react"

import type {AFC} from "lib/type/AsyncFunctionComponent"
import {User, UserRoles} from "server/db/entity/User"
import {getORM} from "server/lib/db/orm"

interface Props {
  children: ReactNode
}

const SuperLayout: AFC<Props> = async ({children}) => {
  const orm = await getORM()

  // Use regular findOne to tell TS to stop (using) if there's super user found
  const user = await orm.em.findOne(User, {role: UserRoles.SUPER}, {
    disableIdentityMap: true
  })

  if (user) {
    notFound()
  }

  return createElement(Fragment, null, children)
}

export default SuperLayout
