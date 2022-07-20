import {GetStaticProps} from "next"
import {isEmpty} from "lodash"
import type {FC} from "react"

import {stringify, parse} from "superjson"

import type {IPageOutput} from "server/trpc/type/output/PageOutput"
import {Post} from "server/db/entity"

import {router} from "server/trpc/route"

interface Props {
  data: string
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await router.createCaller({}).query("posts.all")

  console.log(posts)

  return {
    props: {
      data: stringify(posts)
    }
  }
}

const Home: FC<Props> = ({data}) => {
  const posts = parse<IPageOutput<Post>>(data)

  if (isEmpty(posts.items)) {
    return (
      <div>
        <div>There&apos;s nothing to see here yet</div>
      </div>
    )
  }

  return (
    <ul className="list-none">
      {posts.items.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  )
}

export default Home
