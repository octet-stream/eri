import {type UseEditorOptions, useEditor} from "@tiptap/react"
import type {FC, ReactNode} from "react"
import {useMemo} from "react"

import {EditorContext} from "./EditorContext.jsx"

type BaseProps = Omit<
  UseEditorOptions,
  "immediatelyRender" | "shouldRerenderOnTransaction"
>

export interface EditorProps extends BaseProps {
  children?: ReactNode
  fallback?: ReactNode
  defaultValue?: string | Record<string, any>
}

export const Editor: FC<EditorProps> = ({
  children,
  extensions,
  fallback: _, // TODO: Support fallback
  defaultValue,
  ...options
}) => {
  const content = useMemo(() => {
    if (!defaultValue) {
      return undefined
    }

    // HTML content is not considered since we store it as JSON string in database
    if (typeof defaultValue === "string") {
      return JSON.parse(defaultValue)
    }

    return defaultValue
  }, [defaultValue])

  const editor = useEditor({
    ...options,

    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    extensions,
    content
  })

  // TODO: Add proper fallback
  if (!editor) {
    return <div>Loading...</div>
  }

  return <EditorContext value={editor}>{children}</EditorContext>
}
