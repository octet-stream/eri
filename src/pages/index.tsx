import type {FC} from "react"

import type {OPostsPageOutput} from "server/trpc/type/output/PostsPageOutput"

import {createServerSidePropsLoader} from "lib/util/createPagePropsLoader"
import type {PageDataProps} from "lib/type/PageDataProps"
import {createCaller} from "lib/trpc/server"

import {PostsDataContextProvider} from "context/PostsDataContext"

import {HomeLayout} from "layout/HomeLayout"

import {PostsView} from "view/PostsView"

type PageData = PageDataProps<OPostsPageOutput>

interface Props extends PageData { }

interface SearchParams {
  page?: string
}

const getNotes = createCaller(
  (trpc, params: SearchParams = {}) => trpc.posts.all({
    cursor: params.page
  })
)

export const getServerSideProps = createServerSidePropsLoader<Props>(
  async ctx => {
    const searchParams = ctx.query as SearchParams

    const posts = await getNotes(searchParams)

    return {
      props: {
        data: posts
      }
    }
  }
)

const HomePage: FC<Props> = ({data}) => (
  <PostsDataContextProvider data={data}>
    <HomeLayout>
      <PostsView />
    </HomeLayout>
  </PostsDataContextProvider>
)

export default HomePage
