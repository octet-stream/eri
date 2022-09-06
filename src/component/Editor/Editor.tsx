import {Fragment} from "react"
import type {FC} from "react"

import Head from "next/head"

import type {Value} from "lib/type/Editor"

import {TitleEditor} from "./TitleEditor"
import {ContentEditor} from "./ContentEditor"
import type {ContentEditorOnChangeHandler} from "./ContentEditor"
import type {TitleEditorOnChangeHandler} from "./TitleEditor"

interface Props {
  title?: string
  content?: Value
  onContentChange?: ContentEditorOnChangeHandler
  onTitleChange?: TitleEditorOnChangeHandler
}

export const Editor: FC<Props> = ({
  title,
  content,
  onContentChange,
  onTitleChange
}) => (
  <Fragment>
    <Head>
      <title>{title || "Untitled"}</title>
    </Head>

    <div className="w-full h-full flex flex-col">
      <TitleEditor onTitleChange={onTitleChange} />

      <ContentEditor value={content} onChange={onContentChange} />
    </div>
  </Fragment>
)
