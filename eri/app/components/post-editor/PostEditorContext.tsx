import type {FormProps, FormSchema} from "remix-forms"
import {createContext, useContext} from "react"

type Context = Parameters<NonNullable<FormProps<FormSchema>["children"]>>[0]

export const PostEditorContext = createContext<Context | null>(null)

export function usePostEditorContext(): Context {
  const context = useContext(PostEditorContext)

  if (!context) {
    throw new Error("Can't access post editor context.")
  }

  return context
}
