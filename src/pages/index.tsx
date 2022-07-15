import {GetStaticProps} from "next"
import {isEmpty} from "lodash"
import type {FC} from "react"

import type {IPageOutput} from "server/trpc/type/output/PageOutput"
import {Post} from "server/db/entity"

import {router} from "server/trpc/route"

interface Props {
  posts: IPageOutput<Post>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await router.createCaller({}).query("posts.all")

  return {
    props: {
      posts
    }
  }
}

const Home: FC<Props> = ({posts}) => {
  if (isEmpty(posts.items)) {
    return (
      <div>There&apos;s nothing to see here yet</div>
    )
  }

  return (
    <div>Posts will appear here</div>
  )
}

export default Home
