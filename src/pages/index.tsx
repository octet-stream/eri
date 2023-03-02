import type {GetServerSideProps} from "next"
import {stringify} from "superjson"
import type {FC} from "react"

import Link from "next/link"
import isEmpty from "lodash/isEmpty"

import type {TPostOutput} from "server/trpc/type/output/PostOutput"
import type {IPageOutput} from "server/trpc/type/output/PageOutput"
import {usePageData} from "lib/hook/usePageData"

import {router} from "server/trpc/router"

import {HomeLayout} from "layout/HomeLayout"

interface Props {
  data: string
}

interface Query {
  page?: string
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const trpc = router.createCaller({})

  const query = ctx.query as Query
  const page = query.page ? parseInt(query.page, 10) : null

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

const Home: FC<Props> = () => {
  const posts = usePageData<IPageOutput<TPostOutput>>()

  if (isEmpty(posts.items)) {
    return (
      <HomeLayout>
        <div className="flex flex-1 justify-center items-center select-none">
          <div className="py-2 px-5 text-slate-400 rounded-md">
            There&apos;s nothing to read here yet
          </div>
        </div>
      </HomeLayout>
    )
  }

  return (
    <HomeLayout>
      <ul className="list-none p-0 m-0">
        {posts.items.map(post => (
          <li key={post.id} className="p-0">
            <Link href={`/post/${post.slug}`} className="dark:text-white">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </HomeLayout>
  )
}

export default Home
