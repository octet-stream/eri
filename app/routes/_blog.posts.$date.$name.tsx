import type {MetaArgs, MetaDescriptor} from "@remix-run/react"
import {useLoaderData, generatePath} from "@remix-run/react"
import type {LoaderFunctionArgs} from "@remix-run/node"
import {SlateView} from "slate-to-react"
import type {FC} from "react"

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

import {checkPksLoader} from "../server/loaders/checkPksLoader.js"
import {type IPostSlug, PostSlug} from "../server/zod/post/PostSlug.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"
import {formatPostDate} from "../lib/utils/formatPostDate.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {PostOutput} from "../server/zod/post/PostOutput.js"
import {Post} from "../server/db/entities.js"

export const loader = async (event: LoaderFunctionArgs) => {
  await checkPksLoader({
    ...event,

    context: {
      ...event.context,

      pksRedirect: slug => generatePath("/posts/:slug", {slug})
    }
  })

  const {
    params,
    context: {orm}
  } = event

  const slug = await parseInput(PostSlug, params as IPostSlug, {async: true})
  const post = await orm.em.findOneOrFail(
    Post,

    {
      slug
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
}

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

        <small className="text-muted-foreground" suppressHydrationWarning>
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
