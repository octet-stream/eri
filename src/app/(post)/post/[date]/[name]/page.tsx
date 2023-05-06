import type {Metadata} from "next"

import {Post} from "server/db/entity"
import {getORM} from "server/lib/db/orm"

import type {AFC} from "lib/type/AsyncFunctionComponent"
import {patchStaticParams} from "lib/util/patchStaticParams"

import {PostDataContextProvider} from "context/PostDataContext"

import {PostView} from "./_/component/PostView"
import {getPost} from "./_/loader/getPost"

export interface Params {
  date: string
  name: string
}

interface Props {
  params: Params
}

export const generateStaticParams = patchStaticParams<Params>(async () => {
  const orm = await getORM()

  const posts = await orm.em.find(Post, {}, {
    disableIdentityMap: true,
    fields: ["slug"]
  })

  return posts.map(({slug}) => {
    const [date, name] = slug.split("/")

    return {date, name}
  })
})

// TODO: Add cache for tRPC procedure callers to deduplicate database requests
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {title} = await getPost(params)

  return {
    title
  }
}

const PostViewPage: AFC<Props> = async ({params}) => {
  const post = await getPost(params)

  return (
    <PostDataContextProvider data={post}>
      <PostView />
    </PostDataContextProvider>
  )
}

export default PostViewPage
