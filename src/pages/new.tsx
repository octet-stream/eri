import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"
import {useRef} from "react"

import getServerSideSession from "lib/util/getServerSideSession"

import {client} from "lib/trpc"

import {EditorLayout} from "layout/Editor"

import type {EditorRef} from "component/Editor"
import {Button} from "component/Button"
import {Editor} from "component/Editor"

interface Props { }

export const getServerSideProps = getServerSideSession

const NewPostPage: FC<Props> = () => {
  const ref = useRef<EditorRef>()
  const router = useRouter()

  const onSubmit = async () => {
    if (!ref.current) {
      return
    }

    try {
      const data = await ref.current.save()

      const {slug} = await client.mutation("post.create", data)

      router.replace(`/post/${slug}`)
    } catch (error) {
      toast.error("Can't create post")
    }
  }

  return (
    <EditorLayout>
      <div className="w-full h-full flex flex-col">
        <Editor ref={ref} />

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
