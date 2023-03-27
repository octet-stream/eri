import {useEvent} from "react-use-event-hook"
import {useSession} from "next-auth/react"
import type {Session} from "next-auth"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"

import {
  getServerSideSessionRedirect
} from "lib/util/getServerSideSessionRedirect"

import type {OUserOutput} from "server/trpc/type/output/UserOutput"

import {client} from "lib/trpc"

import {PostNewLayout} from "layout/PostNewLayout"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

interface Props {
  session: Session
}

export const getServerSideProps = getServerSideSessionRedirect

const NewPostPage: FC<Props> = () => {
  const session = useSession()
  const router = useRouter()

  const onSubmit = useEvent<EditorOnSaveHandler>(async data => {
    try {
      const {slug} = await client.post.create.mutate(data)

      await router.replace(`/post/${slug}`, undefined, {
        unstable_skipClientCache: true
      })
    } catch {
      toast.error("Can't create post")
    }
  })

  return (
    <PostNewLayout>
      <PostEditor
        isNew
        onSave={onSubmit}
        author={session.data!.user as Pick<OUserOutput, "login">}
      />
    </PostNewLayout>
  )
}

export default NewPostPage
