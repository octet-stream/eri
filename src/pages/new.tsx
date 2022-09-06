import {toast} from "react-hot-toast"
// import {useRouter} from "next/router"
import type {FC} from "react"

import getServerSideSession from "lib/util/getServerSideSession"

// import {client} from "lib/trpc"

import {EditorLayout} from "layout/EditorLayout"

import {Button} from "component/Button"
import {Editor} from "component/Editor"

interface Props { }

export const getServerSideProps = getServerSideSession

const NewPostPage: FC<Props> = () => {
  // const router = useRouter()

  const onSubmit = async () => {
    try {
      // const {slug} = await client.mutation("post.create", data)

      // router.replace(`/post/${slug}`)

      console.log("Not implemented")
    } catch {
      toast.error("Can't create post")
    }
  }

  return (
    <EditorLayout>
      <div className="w-full h-full flex flex-col">
        <Editor />

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
