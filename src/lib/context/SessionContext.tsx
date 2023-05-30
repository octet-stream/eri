"use client"

import type {FC, ReactNode} from "react"
import type {Session} from "next-auth"
import {createContext} from "react"

import type {MaybeNull} from "lib/type/MaybeNull"

export type MaybeSession = MaybeNull<Session>

export const SessionContext = createContext<MaybeSession>(null)

interface Props {
  session: MaybeSession
  children: ReactNode
}

export const SessionProvider: FC<Props> = ({session, children}) => (
  <SessionContext.Provider value={session}>
    {children}
  </SessionContext.Provider>
)
