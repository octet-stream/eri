import type {GetStaticPaths} from "next"
import type {FC} from "react"

import {Post} from "server/db/entity"
import {getORM} from "server/lib/db/orm"
import {OPostOutput} from "server/trpc/type/output/PostOutput"

import {createStaticPropsLoader} from "lib/util/createPagePropsLoader"
import {patchStaticPaths} from "lib/util/patchStaticPaths"
import type {PageDataProps} from "lib/type/PageDataProps"

import type {GetPostParams} from "loader/getPost"
import {getPost} from "loader/getPost"

import {PostDataContextProvider} from "context/PostDataContext"

import {PostLayout} from "layout/PostLayout"

import {PostView} from "view/PostView"

type PageData = PageDataProps<OPostOutput>

interface Props extends PageData { }

interface Params extends GetPostParams { }

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

export const getStaticProps = createStaticPropsLoader<Props>(async ctx => {
  const {date, name} = ctx.params as unknown as Params

  const post = await getPost({date, name})

  return {
    props: {
      data: post
    }
  }
})

const PostPage: FC<Props> = ({data}) => (
  <PostDataContextProvider data={data}>
    <PostLayout title={data.title}>
      <PostView />
    </PostLayout>
  </PostDataContextProvider>
)

export default PostPage
