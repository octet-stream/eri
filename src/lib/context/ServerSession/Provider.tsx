"use client"

import {FC, ReactNode} from "react"
import {Session} from "next-auth"

import {ServerSessionContext} from "./Context"

interface Props {
  session: Session
  children: ReactNode
}

export const ServerSessionContextProvider: FC<Props> = ({
  session,
  children
}) => (
  <ServerSessionContext.Provider value={session}>
    {children}
  </ServerSessionContext.Provider>
)
