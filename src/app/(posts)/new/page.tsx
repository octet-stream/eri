"use client"

import {useEvent} from "react-use-event-hook"
import {useRouter} from "next/navigation"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {client} from "lib/trpc/client"
import {OUserOutput} from "server/trpc/type/output/UserOutput"
import {useServerSession} from "lib/hook/useServerSession"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

const PostNewPage: FC = () => {
  const session = useServerSession()
  const router = useRouter()

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
      data={{author: session.user! as OUserOutput}}
      onSave={onSave}
    />
  )
}

export default PostNewPage
