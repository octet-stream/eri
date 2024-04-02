import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"
import {SlateView} from "slate-to-react"
import {json} from "@remix-run/node"
import type {FC} from "react"

import {Post} from "../server/db/entities.js"
import {withOrm} from "../server/lib/db/orm.js"

interface Params {
  date: string
  name: string
}

export const loader = withOrm(async (orm, {params}: LoaderFunctionArgs) => {
  // TODO: Valiadte with zod or use tRPC
  const {date, name} = params as unknown as Params

  const slug = `${date}/${name}`

  const post = await orm.em.findOne(Post, {slug})

  if (!post) {
    throw new Response(null, {
      status: 404
    })
  }

  return json(post)
})

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {
    title: data?.title
  }
]

const PostViewPage: FC = () => {
  const post = useLoaderData<typeof loader>()

  return (
    <SlateView nodes={post.content} />
  )
}

export default PostViewPage
