import {getServerSession} from "next-auth/next"
import {redirect} from "next/navigation"
import type {ReactNode} from "react"

import {serverAddress} from "lib/util/serverAddress"
import type {AFC} from "lib/type/AsyncFunctionComponent"
import {options} from "app/api/auth/[...nextauth]/route"

import {ServerSessionContextProvider} from "./Provider"

interface Props {
  children: ReactNode
  redirectUrl: string | URL
}

export const ServerSession: AFC<Props> = async ({
  children,
  redirectUrl
}) => {
  const session = await getServerSession(options)

  if (!session) {
    redirect(new URL(redirectUrl, serverAddress).pathname)
  }

  return (
    <ServerSessionContextProvider session={session}>
      {children}
    </ServerSessionContextProvider>
  )
}
