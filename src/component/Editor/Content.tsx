import {useEffect, useRef, memo, ComponentProps} from "react"

import EditorJS from "@editorjs/editorjs"

import {tools} from "./tools"

type Ref = EditorJS | undefined

export interface OnContentEditorReadyHandler {
  (instance: EditorJS): void
}

interface Props {
  onReady?: OnContentEditorReadyHandler
}

// eslint-disable-next-line react/prop-types
export const ContentEditor = memo<Props>(({onReady}) => {
  const editorRef = useRef<Ref>()

  useEffect(() => {
    const editor = new EditorJS({
      tools,
      holder: "editor",
      placeholder: "Write your thoughts here",
      defaultBlock: "paragraph",
      onReady() {
        editorRef.current = editor

        if (onReady) {
          onReady(editorRef.current)
        }
      }
    })

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
      }
    }
  })

  return (
    <article id="editor" className="prose flex-1 mb-4" />
  )
})

export type ContentProps = ComponentProps<typeof ContentEditor>
