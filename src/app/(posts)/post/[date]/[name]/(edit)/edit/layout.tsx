import type {ReactNode} from "react"
import type {Metadata} from "next"

import type {AFC} from "lib/type/AsyncFunctionComponent"

import {PostDataContextProvider} from "context/PostDataContext"

import {Params} from "../../page"
import {getPost} from "../../_/loader/getPost"

interface Props {
  // eslint-disable-next-line react/no-unused-prop-types
  params: Params
  children: ReactNode
}

export const dynamic = "force-dynamic"

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {title} = await getPost(params)

  return {
    title
  }
}

const PostEditLayout: AFC<Props> = async ({params, children}) => {
  const post = await getPost(params)

  return (
    <PostDataContextProvider data={post}>
      {children}
    </PostDataContextProvider>
  )
}

export default PostEditLayout
