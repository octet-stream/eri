import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"
import {useCallback} from "react"

import getServerSideSession from "lib/util/getServerSideSession"

import {client} from "lib/trpc"

import {EditorLayout} from "layout/EditorLayout"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

interface Props { }

export const getServerSideProps = getServerSideSession

const NewPostPage: FC<Props> = () => {
  const router = useRouter()

  const onSubmit = useCallback<EditorOnSaveHandler>(async data => {
    try {
      const {slug} = await client.mutation("post.create", data)

      router.replace(`/post/${slug}`)
    } catch {
      toast.error("Can't create post")
    }
  }, [])

  return (
    <EditorLayout>
      <div className="w-full h-full flex flex-col">
        <PostEditor onSave={onSubmit} />
      </div>
    </EditorLayout>
  )
}

export default NewPostPage
