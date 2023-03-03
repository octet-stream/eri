import type {GetServerSideProps} from "next"
import {stringify} from "superjson"
import type {FC} from "react"

import isEmpty from "lodash/isEmpty"

import {router} from "server/trpc/router"

import {HomeLayout} from "layout/HomeLayout"

import {PostsView} from "view/PostsView"

interface Props {
  data: string
}

interface Query {
  page?: string
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const trpc = router.createCaller({})

  const query = ctx.query as Query
  const page = query.page ? parseInt(query.page, 10) : undefined

  if (page && page < 1) {
    return {
      notFound: true
    }
  }

  const posts = await trpc.posts.all({cursor: page})

  // Check if user is not on the 1st page and if the items list is empty. If so, render 404 page.
  if (isEmpty(posts.items) && page && page !== 1) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      data: stringify(posts)
    }
  }
}

const HomePage: FC<Props> = () => (
  <HomeLayout>
    <PostsView />
  </HomeLayout>
)

export default HomePage
