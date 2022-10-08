import type {GetStaticProps, GetStaticPaths} from "next"
import {formatRelative} from "date-fns"
import {TRPCError} from "@trpc/server"
import {stringify} from "superjson"
import type {FC} from "react"
import {useMemo} from "react"

import {Post} from "server/db/entity"
import {router} from "server/trpc/route"
import {runIsolatied} from "server/lib/db"
import {IPostOutput} from "server/trpc/type/output/PostOutput"

import {patchStaticPaths} from "lib/util/patchStaticPaths"
import {transformNodes} from "lib/slate-to-react"
import {usePageData} from "lib/hook/usePageData"
import {PostLayout} from "layout/PostLayout"

interface Props {
  data: string
}

interface Query {
  date: string
  name: string
}

type Paths = Awaited<ReturnType<GetStaticPaths>>["paths"]

export const getStaticPaths = patchStaticPaths(async () => {
  const posts = await runIsolatied(async em => em.find(
    Post,

    {},

    {
      fields: ["slug"],
      limit: 100,
      orderBy: {
        createdAt: "desc"
      }
    }
  ))

  const paths: Paths = posts.map(({slug}) => {
    const [date, name] = slug.split("/")

    return {params: {date, name}}
  })

  return {paths, fallback: "blocking"}
})

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

const PostPage: FC<Props> = () => {
  const [post] = usePageData<IPostOutput>()

  const content = useMemo(() => transformNodes(post.content), [post.content])

  return (
    <PostLayout title={post.title}>
      <h1 className="mb-0">{post.title}</h1>

      <div>
        <small className="text-gray-500">
          <span>
            {formatRelative(post.createdAt, Date.now())}
          </span>

          <span>
            {` by @${post.author.login}`}
          </span>
        </small>
      </div>

      <div className="flex-1">
        {content}
      </div>
    </PostLayout>
  )
}

export default PostPage
