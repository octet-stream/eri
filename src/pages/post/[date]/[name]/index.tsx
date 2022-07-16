import type {GetStaticProps} from "next"
import {TRPCError} from "@trpc/server"
import {useRouter} from "next/router"
import type {FC} from "react"

import {router} from "server/trpc/route"
import {Post} from "server/db/entity/Post"

import getEmptyPaths from "lib/util/getEmptyPaths"

interface Props {
  post: Post
}

interface Query {
  date: string
  name: string
}

export const getStaticPaths = getEmptyPaths

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const {date, name} = params as unknown as Query

  try {
    const post = await router.createCaller({}).query("post.getBySlug", {
      slug: [date, name].join("/")
    })

    return {
      props: {
        post
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

const PostPage: FC<Props> = () => {
  const router = useRouter()

  // TODO: DO NOT forget to add support for the fallback version of the page: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-pages
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div>Post will be here</div>
  )
}

export default PostPage
