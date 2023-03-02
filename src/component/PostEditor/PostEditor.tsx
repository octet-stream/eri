import {Fragment, useState, useMemo} from "react"
import type {FC} from "react"

import Head from "next/head"
import useEvent from "react-use-event-hook"

import {isEditorContentEmpty} from "lib/util/isEditorContentEmpty"

import type {TUserOutput} from "server/trpc/type/output/UserOutput"
import type {Value} from "lib/type/Editor"

import {Button} from "component/Button"
import {PostInfo} from "component/PostInfo"

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
  isNew?: boolean
  title?: string
  content?: Value
  author: Pick<TUserOutput, "login">
  interactivePageTitle?: boolean
  onSave: EditorOnSaveHandler
}

export const PostEditor: FC<Props> = ({
  title: initialTitle = "",
  content: initialContent = [],
  interactivePageTitle = true,
  isNew = false,
  author,
  onSave
}) => {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState<Value>(initialContent)

  const postInfo = useMemo(
    () => [
      isNew ? "A new post" : "Published",

      "by",

      `@${author.login}`
    ].join(" "),

    [isNew, author.login]
  )

  const pageTitle = useMemo<string>(() => title.trim() || "Untitled", [title])

  const isSubmittingDisabled = !title || isEditorContentEmpty(content)

  const onTitleChange = useEvent<TitleEditorOnChangeHandler>(
    val => setTitle(val)
  )

  const onContentChange = useEvent<ContentEditorOnChangeHandler>(
    val => setContent(val)
  )

  const onSubmitClick = useEvent(() => onSave({title, content}))

  return (
    <Fragment>
      {interactivePageTitle && (
        <Head>
          <title>{pageTitle}</title>
        </Head>
      )}

      <div className="w-full h-full flex flex-col relative">
        <div className="flex flex-1 flex-col">
          <TitleEditor value={title} onTitleChange={onTitleChange} />

          <div>
            <PostInfo>
              {postInfo}
            </PostInfo>
          </div>

          <ContentEditor value={content} onChange={onContentChange} />
        </div>

        <div className="flex justify-end mt-5">
          <Button
            type="button"
            variant="primary"
            color="brand"
            disabled={isSubmittingDisabled}
            onClick={onSubmitClick}
          >
            Publish
          </Button>
        </div>
      </div>
    </Fragment>
  )
}
