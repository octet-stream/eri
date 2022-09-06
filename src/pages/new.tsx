import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import {useState} from "react"
import type {FC} from "react"

import type {Value} from "lib/type/Editor"

import getServerSideSession from "lib/util/getServerSideSession"

import {client} from "lib/trpc"

import {EditorLayout} from "layout/EditorLayout"

import type {
  TitleEditorOnChangeHandler,
  ContentEditorOnChangeHandler
} from "component/Editor"
import {Button} from "component/Button"
import {Editor} from "component/Editor"

interface Props { }

export const getServerSideProps = getServerSideSession

const NewPostPage: FC<Props> = () => {
  const router = useRouter()

  // TODO: Probably should move these inside of Editor (including buttons)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState<Value>([])

  const onTitleChange: TitleEditorOnChangeHandler = value => {
    setTitle(value)
  }

  const onContentChange: ContentEditorOnChangeHandler = value => {
    setContent(value)
  }

  const onSubmit = async () => {
    try {
      const {slug} = await client.mutation("post.create", {title, content})

      router.replace(`/post/${slug}`)
    } catch {
      toast.error("Can't create post")
    }
  }

  return (
    <EditorLayout>
      <div className="w-full h-full flex flex-col">
        <Editor
          title={title}
          content={content}
          onTitleChange={onTitleChange}
          onContentChange={onContentChange}
        />

        <div className="flex justify-end">
          <Button type="button" onClick={onSubmit}>
            Publish
          </Button>
        </div>
      </div>
    </EditorLayout>
  )
}

export default NewPostPage
