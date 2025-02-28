import {createContext, useContext} from "react"

import type {MaybeNull} from "../../../lib/types/MaybeNull.js"

import type {Route} from "../+types/route.js"

export type PostContextData = NonNullable<
  Route.ComponentProps["loaderData"]["items"][number]
>

export const PostContext = createContext<MaybeNull<PostContextData>>(null)

export function usePostContext(): PostContextData {
  const context = useContext(PostContext)

  if (!context) {
    throw new Error("Unable to find PostContext")
  }

  return context
}
