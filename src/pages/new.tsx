import {unstable_getServerSession as getServerSession} from "next-auth/next"
import type {FC, ChangeEventHandler} from "react"
import type {GetServerSideProps} from "next"
import type {Session} from "next-auth"
import {useState} from "react"

import {options} from "pages/api/auth/[...nextauth]"

import {Input} from "component/Input"
import {EditorLayout} from "layout/Editor"

interface Props { }

interface ServerSideProps extends Props {
  session: Session | null
}

type GetServerSidePropsHandler = GetServerSideProps<ServerSideProps>

export const getServerSideProps: GetServerSidePropsHandler = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, options)

  return {
    props: {
      session
    }
  }
}

const NewPostPage: FC<Props> = () => {
  const [title, setTitle] = useState("")

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({target}) => {
    setTitle(target.value)
  }

  return (
    <EditorLayout title={title || "Untitled"}>
      <div className="w-full h-full flex flex-col">
        <Input className="w-full mb-4" onChange={updateTitle} />

        <textarea className="w-full mb-4 border-black border rounded-md flex-1" />

        <div className="flex justify-end">
          <button type="button" className="rounded-md bg-black text-white py-2 px-5 disabled:bg-gray-100 disabled:text-black disabled:cursor-not-allowed">
            Publish
          </button>
        </div>
      </div>
    </EditorLayout>
  )
}

export default NewPostPage
