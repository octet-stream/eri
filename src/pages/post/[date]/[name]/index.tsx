import type {GetStaticProps, GetStaticPaths} from "next"
import {TRPCError} from "@trpc/server"
import {stringify} from "superjson"
import type {FC} from "react"

import {Post} from "server/db/entity"
import {getORM} from "server/lib/db/orm"
import {router} from "server/trpc/router"
import {TPostOutput} from "server/trpc/type/output/PostOutput"

import {patchStaticPaths} from "lib/util/patchStaticPaths"
import {usePageData} from "lib/hook/usePageData"

import {PostLayout} from "layout/PostLayout"

import {PostView} from "view/PostView"

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
  const {title} = usePageData<TPostOutput>()

  return (
    <PostLayout title={title}>
      <PostView />
    </PostLayout>
  )
}

export default PostPage
