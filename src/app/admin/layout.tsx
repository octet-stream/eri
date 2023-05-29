import type {ReactElement} from "react"

import type {AFC} from "lib/type/AsyncFunctionComponent"

import {User, UserRoles} from "server/db/entity/User"
import {getORM} from "server/lib/db/orm"

interface Props {
  admin: ReactElement
  signup: ReactElement
}

const AdminRootLayout: AFC<Props> = async ({admin, signup}) => {
  const orm = await getORM()

  // Use regular findOne to tell TS to stop (using) if there's super user found
  const user = await orm.em.findOne(User, {role: UserRoles.SUPER}, {
    disableIdentityMap: true
  })

  return user ? admin : signup
}

export default AdminRootLayout
