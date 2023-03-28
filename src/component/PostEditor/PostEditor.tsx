import {Fragment, useState, useMemo} from "react"
import {useEvent} from "react-use-event-hook"
import type {FC} from "react"

import Head from "next/head"

import {isEditorContentEmpty} from "lib/util/isEditorContentEmpty"

import type {OUserOutput} from "server/trpc/type/output/UserOutput"
import type {Value} from "lib/type/Editor"

import {Button} from "component/Button"
import {PostInfo} from "component/PostInfo"

import {TitleEditor} from "./TitleEditor"
import {ContentEditor} from "./ContentEditor"
import type {ContentEditorOnChangeHandler} from "./ContentEditor"
import type {TitleEditorOnChangeHandler} from "./TitleEditor"

interface PostEditorDataOutput {
  title: string
  content: Value
}

export interface EditorOnSaveHandler {
  (data: PostEditorDataOutput): void
}

export interface PostEditorDataInput extends Partial<PostEditorDataOutput> {
  author: Pick<OUserOutput, "login">
}

interface Props {
  isNew?: boolean
  interactivePageTitle?: boolean
  data: PostEditorDataInput
  onSave: EditorOnSaveHandler
}

export const PostEditor: FC<Props> = ({
  interactivePageTitle = true,
  isNew = false,
  data,
  onSave
}) => {
  const {author} = data

  const [title, setTitle] = useState(() => data.title || "")
  const [content, setContent] = useState<Value>(() => data.content || [])

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
