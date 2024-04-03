import type {SerializeFrom} from "@remix-run/node"
import {createContext, useContext} from "react"

import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

import {loader} from "../route.jsx"

export type PostContextData = Omit<SerializeFrom<typeof loader>, "title">["list"][number]

export const PostContext = createContext<MaybeNull<PostContextData>>(null)

export function usePostContext(): PostContextData {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("Unable to find PostContext")
  }

  return context
}
