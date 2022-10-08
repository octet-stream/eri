import {unstable_getServerSession as getServerSession} from "next-auth/next"
import type {GetServerSideProps} from "next"
import type {Session} from "next-auth"
import {TRPCError} from "@trpc/server"
import {toast} from "react-hot-toast"
import {useRouter} from "next/router"
import {stringify} from "superjson"
import type {FC} from "react"

import useEvent from "react-use-event-hook"

import {client} from "lib/trpc"
import {router} from "server/trpc/route"
import {Post} from "server/db/entity/Post"
import {usePageData} from "lib/hook/usePageData"

import {options} from "pages/api/auth/[...nextauth]"

import {EditorLayout} from "layout/EditorLayout"

import type {EditorOnSaveHandler} from "component/PostEditor"
import {PostEditor} from "component/PostEditor"

interface Props {
  data: string
  session: Session
}

interface Query {
  date: string
  name: string
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
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

  try {
    const post = await router.createCaller({}).query("post.getBySlug", {
      slug: [date, name]
    })

    return {
      props: {
        data: stringify(post),
        session
      }
    }
  } catch (error) {
    if (error instanceof TRPCError && error.code === "NOT_FOUND") {
      return {
        notFound: true
      }
    }

    throw error
  }
}

const PostEditPage: FC<Props> = () => {
  const router = useRouter()

  const [post, updatePageData] = usePageData<Post>()

  const onSave = useEvent<EditorOnSaveHandler>(async fields => {
    try {
      const updated = await client.mutation("post.update", {
        id: post.id, ...fields
      })

      const pageId = `/post/${updated.slug}`

      // ! Patch data on post page, because of what presumably is a bug in Next.js
      updatePageData(pageId, updated)

      await router.replace(pageId)
    } catch {
      toast.error("Can't update this post")
    }
  })

  return (
    <EditorLayout>
      <PostEditor
        title={post.title}
        content={post.content}
        onSave={onSave}
        author={post.author}
      />
    </EditorLayout>
  )
}

export default PostEditPage
