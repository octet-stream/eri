"use client"

import {createContext} from "react"
import {Session} from "next-auth"

import type {MaybeUndefined} from "lib/type/MaybeUndefined"

export const ServerSessionContext = createContext<MaybeUndefined<Session>>(
  undefined
)
