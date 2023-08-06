import {notFound} from "next/navigation"
import type {ReactElement} from "react"

import {getORM} from "server/lib/db/orm"
import {User, UserRoles} from "server/db/entity/User"

import {AFC} from "lib/type/AsyncFunctionComponent"
import {AuthLayout} from "app/admin/_/layout/AuthLayout"

interface Props {
  children: ReactElement
}

const SetupLayout: AFC<Props> = async ({children}) => {
  const orm = await getORM()

  const user = await orm.em.findOne(User, {role: UserRoles.SUPER}, {
    disableIdentityMap: true,
    fields: ["id"]
  })

  if (user) {
    notFound()
  }

  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  )
}

export default SetupLayout
