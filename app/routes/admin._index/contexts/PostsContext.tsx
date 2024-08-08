import {createContext, useContext} from "react"

import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

import type {loader} from "../route.jsx"

export type PostsContextData = Awaited<ReturnType<typeof loader>>["page"]

export const PostsContext = createContext<MaybeNull<PostsContextData>>(null)

export function usePostsContext(): PostsContextData {
  const context = useContext(PostsContext)

  if (!context) {
    throw new Error("Unable to find PostsContext")
  }

  return context
}
