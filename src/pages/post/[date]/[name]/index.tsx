import type {GetStaticProps, GetStaticPaths} from "next"
import {stringify, parse} from "superjson"
import {formatRelative} from "date-fns"
import {TRPCError} from "@trpc/server"
import type {FC} from "react"
import {useMemo} from "react"

import {runIsolatied} from "server/lib/db"
import {router} from "server/trpc/route"
import {Post} from "server/db/entity/Post"

import {PostLayout} from "layout/PostLayout"

interface Props {
  data: string
}

interface Query {
  date: string
  name: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await runIsolatied(async em => em.find(
    Post,

    {},

    {
      limit: 100,
      orderBy: {
        createdAt: "desc"
      }
    }
  ))

  const paths = posts.map(({slug}) => {
    const [date, name] = slug.split("/")

    return {params: {date, name}}
  })

  return {paths, fallback: "blocking"}
}

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const {date, name} = params as unknown as Query

  try {
    const post = await router.createCaller({}).query("post.getBySlug", {
      slug: [date, name]
    })

    return {
      props: {
        data: stringify(post)
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

const PostPage: FC<Props> = ({data}) => {
  const post = useMemo(() => parse<Post>(data), [data])

  return (
    <PostLayout title={post.title}>
      <h1 className="mb-0">{post.title}</h1>

      <small className="text-gray-500">
        <span>
          {formatRelative(post.createdAt, Date.now())}
        </span>
        <span>
          {` by @${post.author.login}`}
        </span>
      </small>

      <div className="pt-2">Content will be here</div>
    </PostLayout>
  )
}

export default PostPage
