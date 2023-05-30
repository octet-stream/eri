/* eslint-disable no-redeclare */

import type {Session} from "next-auth"
import {useContext} from "react"

import type {MaybeNull} from "lib/type/MaybeNull"
import {SessionContext} from "lib/context/SessionContext"

export function useSession(required: true): Session
export function useSession(): MaybeNull<Session>
export function useSession(required?: true): MaybeNull<Session> {
  const session = useContext(SessionContext)

  if (!session && required) {
    // TODO: Add 403 error boundary and throw appropriate error
    throw new Error("Session not found")
  }

  return session
}
