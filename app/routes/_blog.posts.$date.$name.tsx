import type {LoaderFunctionArgs, MetaFunction} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"
import {SlateView} from "slate-to-react"
import {json} from "@remix-run/node"
import {format} from "date-fns"
import type {FC} from "react"

import {Post} from "../server/db/entities.js"
import {withOrm} from "../server/lib/db/orm.js"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Anchor} from "../components/slate-view/elements/Anchor.jsx"
import {Blockquote} from "../components/slate-view/elements/Blockquote.jsx"
import {Heading as CommonHeading} from "../components/common/Heading.jsx"
import {Paragraph} from "../components/slate-view/elements/Paragraph.jsx"
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

  const post = await orm.em.findOne(Post, {slug}, {
    populate: ["content"]
  })

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
    <article>
      <div className="mb-5">
        <CommonHeading variant="h1">
          {post.title}
        </CommonHeading>

        <small className="text-muted-foreground">
          {format(post.createdAt, "MMMM do, y")}
        </small>
      </div>

      <SlateView
        nodes={post.content}
        transforms={{
          elements: [Paragraph, Anchor, Heading, Blockquote],
          leaves: [Text]
        }}
      />
    </article>
  )
}

export default PostViewPage
