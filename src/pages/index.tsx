import {stringify, parse} from "superjson"
import {GetStaticProps} from "next"
import {isEmpty} from "lodash"
import type {FC} from "react"
import {useMemo} from "react"

import Link from "next/link"

import type {IPageOutput} from "server/trpc/type/output/PageOutput"
import {Post} from "server/db/entity"

import {router} from "server/trpc/route"

import {HomeLayout} from "layout/HomeLayout"

interface Props {
  data: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await router.createCaller({}).query("posts.all")

  return {
    props: {
      data: stringify(posts)
    }
  }
}

const Home: FC<Props> = ({data}) => {
  const posts = useMemo(() => parse<IPageOutput<Post>>(data), [data])

  if (isEmpty(posts.items)) {
    return (
      <HomeLayout>
        <div>
          <div>There&apos;s nothing to see here yet</div>
        </div>
      </HomeLayout>
    )
  }

  return (
    <HomeLayout>
      <ul className="list-none p-0">
        {posts.items.map(post => (
          <li key={post.id} className="p-0">
            <Link href={`/post/${post.slug}`}>
              <a>
                {post.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </HomeLayout>
  )
}

export default Home
