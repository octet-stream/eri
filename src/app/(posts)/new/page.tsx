"use client"

import {useEvent} from "react-use-event-hook"
import {useRouter} from "next/navigation"
import {toast} from "react-hot-toast"
import {useMemo} from "react"
import type {FC} from "react"
import {v4} from "uuid"

import {client} from "lib/trpc/client"
import {useServerSession} from "lib/hook/useServerSession"
import {ElementParagraph} from "server/trpc/type/common/EditorData"

import type {
  EditorOnSaveHandler,
  PostEditorDataInput
} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

const PostNewPage: FC = () => {
  const session = useServerSession()
  const router = useRouter()

  const data = useMemo<PostEditorDataInput>(() => ({
    title: "",
    content: [{
      id: v4(),
      type: ElementParagraph.value,
      children: [{
        id: v4(),
        text: ""
      }]
    }],
    author: session.user
  }), [session])

  const onSave = useEvent<EditorOnSaveHandler>(data => (
    client.post.create.mutate(data)
      .then(({slug}) => router.replace(`/post/${slug}`))
      .catch(error => {
        toast.error("Can't create a new post.")
        console.error(error)
      })
  ))

  return (
    <PostEditor
      isNew
      data={data}
      onSave={onSave}
    />
  )
}

export default PostNewPage
