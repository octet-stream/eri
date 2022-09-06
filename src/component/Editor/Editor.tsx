import {OutputData} from "@editorjs/editorjs"
import {useState, Fragment} from "react"
import type {FC} from "react"

import dynamic from "next/dynamic"
import Head from "next/head"

import {TitleEditor} from "./TitleEditor"
import type {ContentProps} from "./ContentEditor"
import type {TitleEditorOnChangeHandler} from "./TitleEditor"

const ContentEditor = dynamic<ContentProps>(
  () => import("component/Editor/ContentEditor").then(m => m.ContentEditor),

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

interface Props {
  title?: string
}

export const Editor: FC<Props> = ({title: initialTitle}) => {
  const [title, setTitle] = useState(initialTitle || "")

  const onTitleChange: TitleEditorOnChangeHandler = text => setTitle(text)

  return (
    <Fragment>
      <Head>
        <title>{title || "Untitled"}</title>
      </Head>

      <div className="w-full h-full flex flex-col">
        <TitleEditor onTitleChange={onTitleChange} />

        <ContentEditor />
      </div>
    </Fragment>
  )
}
