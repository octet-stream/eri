import {getServerSession} from "next-auth/next"
import {useEvent} from "react-use-event-hook"
import type {Session} from "next-auth"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import type {FC} from "react"

import {OPostOutput} from "server/trpc/type/output/PostOutput"

import {createServerSidePropsLoader} from "lib/util/createPagePropsLoader"
import type {PageDataProps} from "lib/type/PageDataProps"
import {client} from "lib/trpc"

import {getPost} from "loader/getPost"
import type {GetPostParams} from "loader/getPost"

import {PostDataContextProvider} from "context/PostDataContext"

import {options} from "pages/api/auth/[...nextauth]"

import {PostEditLayout} from "layout/PostEditLayout"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

type PageData = PageDataProps<OPostOutput>

interface Props extends PageData {
  session: Session
}

interface Query extends GetPostParams { }

export const getServerSideProps = createServerSidePropsLoader<Props>(
  async ctx => {
    const {req, res, params} = ctx

    const session = await getServerSession(req, res, options)

    // Return empty session to redirect user to /auth/login
    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login"
        }
      }
    }

    const {date, name} = params as unknown as Query

    const post = await getPost({date, name})

    return {
      props: {
        data: post,
        session
      }
    }
  }
)

const PostEditPage: FC<Props> = ({data: post}) => {
  const router = useRouter()

  const onSave = useEvent<EditorOnSaveHandler>(async fields => {
    try {
      const {slug} = await client.post.update.mutate({
        ...fields, id: post.id
      })

      await router.replace(`/post/${slug}`, undefined, {
        unstable_skipClientCache: true
      })
    } catch {
      toast.error("Can't update this post")
    }
  })

  return (
    <PostDataContextProvider data={post}>
      <PostEditLayout>
        <PostEditor
          title={post.title}
          content={post.content}
          onSave={onSave}
          author={post.author}
        />
      </PostEditLayout>
    </PostDataContextProvider>
  )
}

export default PostEditPage
