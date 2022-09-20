// import {useSession} from "next-auth/react"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"

import useEvent from "react-use-event-hook"

import getServerSideSessionRedirect from "lib/util/getServerSideSessionRedirect"

import {client} from "lib/trpc"

import {EditorLayout} from "layout/EditorLayout"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

interface Props { }

export const getServerSideProps = getServerSideSessionRedirect

const NewPostPage: FC<Props> = () => {
  // const {data} = useSession()
  const router = useRouter()

  const onSubmit = useEvent<EditorOnSaveHandler>(async data => {
    try {
      const {slug} = await client.mutation("post.create", data)

      router.replace(`/post/${slug}`)
    } catch {
      toast.error("Can't create post")
    }
  })

  return (
    <EditorLayout>
      <PostEditor onSave={onSubmit} />
    </EditorLayout>
  )
}

export default NewPostPage
