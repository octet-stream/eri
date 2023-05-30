"use client"

import type {FC, ReactNode} from "react"
import type {Session} from "next-auth"
import {createContext} from "react"

import type {MaybeNull} from "lib/type/MaybeNull"

export const SessionContext = createContext<MaybeNull<Session>>(null)

interface Props {
  session: MaybeNull<Session>
  children: ReactNode
}

export const SessionProvider: FC<Props> = ({session, children}) => (
  <SessionContext.Provider value={session}>
    {children}
  </SessionContext.Provider>
)
