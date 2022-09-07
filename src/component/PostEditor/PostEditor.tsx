import {Fragment, useState, useMemo} from "react"
import type {FC} from "react"

import Head from "next/head"

import isEditorContentEmpty from "lib/util/isEditorContentEmpty"

import type {Value} from "lib/type/Editor"

import {Button} from "component/Button"

import {TitleEditor} from "./TitleEditor"
import {ContentEditor} from "./ContentEditor"
import type {ContentEditorOnChangeHandler} from "./ContentEditor"
import type {TitleEditorOnChangeHandler} from "./TitleEditor"

interface EditorData {
  title: string
  content: Value
}

export interface EditorOnSaveHandler {
  (data: EditorData): void
}

interface Props {
  title?: string
  content?: Value
  interactivePageTitle?: boolean
  onSave: EditorOnSaveHandler
}

export const PostEditor: FC<Props> = ({
  title: initialTitle = "",
  content: initialContent = [],
  interactivePageTitle = true,
  onSave
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState<Value>(initialContent)

  const isSubmittingDisabled = useMemo<boolean>(
    () => !title || isEditorContentEmpty(content),

    [title, content]
  )

  const onTitleChange: TitleEditorOnChangeHandler = val => setTitle(val)

  const onContentChange: ContentEditorOnChangeHandler = val => setContent(val)

  const onSubmitClick = () => onSave({title, content})

  return (
    <Fragment>
      {interactivePageTitle && (
        <Head>
          <title>{title || "Untitled"}</title>
        </Head>
      )}

      <div className="w-full h-full flex flex-col">
        <div className="flex flex-1 flex-col">
          <TitleEditor onTitleChange={onTitleChange} />

          <ContentEditor value={content} onChange={onContentChange} />
        </div>

        <div className="flex justify-end mt-5">
          <Button disabled={isSubmittingDisabled} type="button" onClick={onSubmitClick}>
            Publish
          </Button>
        </div>
      </div>
    </Fragment>
  )
}
