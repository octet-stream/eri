"use client"

import type {FC} from "react"
import {toast} from "react-hot-toast"
import {useRouter} from "next/navigation"
import {useEvent} from "react-use-event-hook"

import type {OUserOutput} from "server/trpc/type/output/UserOutput"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"
import {client} from "lib/trpc/client"

interface Props {
  author: Pick<OUserOutput, "login">
}

export const Editor: FC<Props> = ({author}) => {
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
      data={{author}}
      onSave={onSave}
    />
  )
}
