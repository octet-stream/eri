/* eslint-disable react/no-unused-prop-types */
import {
  useImperativeHandle,
  forwardRef,
  useState,
  Fragment,
  useCallback
} from "react"
import {OutputData} from "@editorjs/editorjs"

import type EditorJS from "@editorjs/editorjs"
import dynamic from "next/dynamic"
import Head from "next/head"

import {TitleEditor} from "./Title"
import type {ContentProps, OnContentEditorReadyHandler} from "./Content"
import type {TitleEditorOnChangeHandler} from "./Title"

const ContentEditor = dynamic<ContentProps>(

  () => import("component/Editor/Content").then(mod => mod.ContentEditor),

  {
    ssr: false
  }
)

interface EditorData {
  title: string
  content: OutputData
}

export interface EditorRef {
  save(): Promise<EditorData>
  clear(): void
}

type Ref = EditorRef | undefined

interface Props {
  title?: string
}

export const Editor = forwardRef<Ref, Props>((p, ref) => {
  const [title, setTitle] = useState(p.title || "")
  const [instance, setInstance] = useState<EditorJS>()

  useImperativeHandle(ref, () => ({
    save: () => instance!.save().then(content => ({title, content})),

    clear: () => instance!.clear()
  }))

  const onTitleChange: TitleEditorOnChangeHandler = text => setTitle(text)

  // Wrap this function into the useCallback to stop memo() from endlessly re-rendering component
  const onReady = useCallback<OnContentEditorReadyHandler>(
    editor => setInstance(editor),

    []
  )

  return (
    <Fragment>
      <Head>
        <title>{title || "Untitled"}</title>
      </Head>

      <div className="w-full h-full flex flex-col">
        <TitleEditor onTitleChange={onTitleChange} />

        <ContentEditor onReady={onReady} />
      </div>
    </Fragment>
  )
})
