import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"
import {SlateView} from "slate-to-react"
import {json} from "@remix-run/node"
import type {FC} from "react"

import {Post} from "../server/db/entities.js"
import {withOrm} from "../server/lib/db/orm.js"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Anchor} from "../components/slate-view/elements/Anchor.jsx"
import {Blockquote} from "../components/slate-view/elements/Blockquote.jsx"
import {Heading} from "../components/slate-view/elements/Heading.jsx"
import {Text} from "../components/slate-view/leaves/Text.jsx"

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

export const handle: BreadcrumbHandle = {
  breadcrumb: () => (
    <Breadcrumb>
      Post
    </Breadcrumb>
  )
}

const PostViewPage: FC = () => {
  const post = useLoaderData<typeof loader>()

  return (
    <SlateView
      nodes={post.content}
      transforms={{
        elements: [Anchor, Heading, Blockquote],
        leaves: [Text]
      }}
    />
  )
}

export default PostViewPage
