import type {GetStaticProps, GetStaticPaths} from "next"
import {formatRelative} from "date-fns"
import {TRPCError} from "@trpc/server"
import {stringify} from "superjson"
import type {FC} from "react"
import {useMemo} from "react"

import {Post} from "server/db/entity"
import {getORM} from "server/lib/db/orm"
import {router} from "server/trpc/router"
import {IPostOutput} from "server/trpc/type/output/PostOutput"

import {patchStaticPaths} from "lib/util/patchStaticPaths"
import {transformNodes} from "lib/slate-to-react"
import {usePageData} from "lib/hook/usePageData"

import {PostLayout} from "layout/PostLayout"

import {H1} from "component/Heading"
import {PostInfo} from "component/PostInfo"

interface Props {
  data: string
}

interface Query {
  date: string
  name: string
}

type Paths = Awaited<ReturnType<GetStaticPaths>>["paths"]

export const getStaticPaths = patchStaticPaths(async () => {
  const orm = await getORM()

  const posts = await orm.em.find(
    Post,

    {},

    {
      disableIdentityMap: true,
      fields: ["slug"],
      limit: 100,
      orderBy: {
        createdAt: "desc"
      }
    }
  )

  const paths: Paths = posts.map(({slug}) => {
    const [date, name] = slug.split("/")

    return {params: {date, name}}
  })

  return {paths, fallback: "blocking"}
})

export const getStaticProps: GetStaticProps<Props> = async ({params}) => {
  const trpc = router.createCaller({})

  const {date, name} = params as unknown as Query

  try {
    const post = await trpc.post.getBySlug({
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
  const post = usePageData<IPostOutput>()

  const postInfo = useMemo<string>(
    () => [
      formatRelative(post.createdAt, Date.now()), // TODO: Make custom formatRelative function.
      `by @${post.author.login}`
    ].join(" "),

    [post.createdAt, post.author.login]
  )

  const content = useMemo(() => transformNodes(post.content), [post.content])

  return (
    <PostLayout title={post.title}>
      <H1 className="mb-0">
        {post.title}
      </H1>

      <div>
        <PostInfo>
          {postInfo}
        </PostInfo>
      </div>

      <div className="flex-1">
        {content}
      </div>
    </PostLayout>
  )
}

export default PostPage
