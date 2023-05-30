import type {ReactElement} from "react"
import type {Metadata} from "next"

import type {AFC} from "lib/type/AsyncFunctionComponent"

import {User, UserRoles} from "server/db/entity/User"
import {getORM} from "server/lib/db/orm"

interface Props {
  admin: ReactElement
  signup: ReactElement
}

export const metadata: Metadata = {
  title: {
    template: "%s | Admin",
    absolute: "Admin"
  }
}

const AdminRootLayout: AFC<Props> = async ({admin, signup}) => {
  const orm = await getORM()

  const user = await orm.em.findOne(User, {role: UserRoles.SUPER}, {
    disableIdentityMap: true,
    fields: ["id"]
  })

  return user ? admin : signup
}

export default AdminRootLayout
