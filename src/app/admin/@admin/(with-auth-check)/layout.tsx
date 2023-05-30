import {getServerSession} from "next-auth/next"
import type {ReactElement} from "react"

import type {AFC} from "lib/type/AsyncFunctionComponent"

import {options} from "app/api/auth/[...nextauth]/route"
import {SessionProvider} from "lib/context/SessionContext"

export const dynamic = "force-dynamic"

interface Props {
  login: ReactElement
  panel: ReactElement
}

const AdminAuthLayout: AFC<Props> = async ({login, panel}) => {
  const session = await getServerSession(options)

  if (!session) {
    return login
  }

  return (
    <SessionProvider session={session}>
      {panel}
    </SessionProvider>
  )
}

export default AdminAuthLayout
