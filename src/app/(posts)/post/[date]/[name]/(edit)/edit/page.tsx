"use client"

import {useEvent} from "react-use-event-hook"
import {useRouter} from "next/navigation"
import {toast} from "react-hot-toast"
import type {FC} from "react"

import {client} from "lib/trpc/client"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

import {usePostData} from "context/PostDataContext"

export const dynamic = "force-dynamic"

const PostEditPage: FC = () => {
  const post = usePostData()
  const router = useRouter()

  const onSave = useEvent<EditorOnSaveHandler>(data => (
    client.post.update.mutate({...data, id: post.id})
      .then(({slug}) => router.replace(`/post/${slug}`))
      .catch(error => {
        toast.error("Can't update this post.")
        console.error(error)
      })
  ))

  return (
    <PostEditor
      isNew
      data={post}
      onSave={onSave}
    />
  )
}

export default PostEditPage
