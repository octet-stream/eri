import {createContext, useContext} from "react"

import type {MaybeNull} from "../../../lib/types/MaybeNull.ts"

import type {loader} from "../route.tsx"

export type PostsContextData = Awaited<ReturnType<typeof loader>>["items"]

export const PostsContext = createContext<MaybeNull<PostsContextData>>(null)

export function usePostsContext(): PostsContextData {
  const context = useContext(PostsContext)

  if (!context) {
    throw new Error("Unable to find PostsContext")
  }

  return context
}
