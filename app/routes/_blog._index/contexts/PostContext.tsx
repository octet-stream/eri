import {createContext, use} from "react"

import type {MaybeNull} from "../../../lib/types/MaybeNull.ts"

import type {loader} from "../route.tsx"

export type PostContextData = NonNullable<
  Awaited<ReturnType<typeof loader>>["items"][number]
>

export const PostContext = createContext<MaybeNull<PostContextData>>(null)

export function usePostContext(): PostContextData {
  const context = use(PostContext)

  if (!context) {
    throw new Error("Unable to find PostContext")
  }

  return context
}
