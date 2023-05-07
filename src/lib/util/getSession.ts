import {getServerSession} from "next-auth/next"
import {redirect} from "next/navigation"
import type {Session} from "next-auth"

import {serverAddress} from "lib/util/serverAddress"
import {options} from "app/api/auth/[...nextauth]/route"

export const getSession = async (url?: string): Promise<Session> => {
  const session = await getServerSession(options)

  if (session) {
    return session
  }

  if (url) {
    redirect(new URL(url, serverAddress).pathname)
  }

  throw new Error("Forbidden")
}
