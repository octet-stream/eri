import {unstable_defineLoader as defineLoader} from "@remix-run/node"
import {useLoaderData} from "@remix-run/react"
import {SlateView} from "slate-to-react"
import type {FC} from "react"
import type {
  MetaArgs_SingleFetch as MetaArgs,
  MetaDescriptor
} from "@remix-run/react"

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

import {formatPostDate} from "../lib/utils/formatPostDate.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"
import {PostOutput} from "../server/zod/post/PostOutput.js"
import {Post} from "../server/db/entities.js"

interface Params {
  date: string
  name: string
}

export const loader = defineLoader(async ({params, context: {orm}}) => {
  const {date, name} = params as unknown as Params

  const post = await orm.em.findOneOrFail(
    Post,

    {
      slug: [date, name].join("/")
    },

    {
      populate: ["content"],
      failHandler(): never {
        throw new Response(null, {
          status: 404,
          statusText: "Unable to find post"
        })
      }
    }
  )

  return parseOutput(PostOutput, post, {async: true})
})

export const meta = ({data}: MetaArgs<typeof loader>): MetaDescriptor[] => [
  {
    title: data?.title
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>Post</Breadcrumb>
}

const PostViewPage: FC = () => {
  const post = useLoaderData<typeof loader>()

  return (
    <article>
      <div className="mb-5">
        <CommonHeading variant="h1">{post.title}</CommonHeading>

        <small className="text-muted-foreground">
          {formatPostDate(post.createdAt)}
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
