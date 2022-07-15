import {GetStaticProps} from "next"
import {isEmpty} from "lodash"
import type {FC} from "react"

import type {IPageOutput} from "server/trpc/type/output/PageOutput"
import {PageArgs} from "server/trpc/helper/PageArgs"
import {Page} from "server/trpc/helper/Page"
import {runIsolatied} from "server/lib/db"
import {Post} from "server/db/entity"

interface Props {
  posts: IPageOutput<Post>
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [items, total] = await runIsolatied(em => em.findAndCount(Post, {}))
  const args = new PageArgs()

  return {
    props: {
      posts: new Page({items, total, args}).toJSON()
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
