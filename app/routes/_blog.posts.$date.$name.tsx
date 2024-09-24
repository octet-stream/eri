import type {MetaArgs, MetaDescriptor} from "@remix-run/react"
import {useLoaderData, generatePath} from "@remix-run/react"
import type {LoaderFunctionArgs} from "@remix-run/node"
import type {FC} from "react"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Heading as CommonHeading} from "../components/common/Heading.jsx"

import {checkPksLoader} from "../server/loaders/checkPksLoader.js"
import {type IPostSlug, PostSlug} from "../server/zod/post/PostSlug.js"
import {PostOutputView} from "../server/zod/post/PostOutputView.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"
import {formatPostDate} from "../lib/utils/formatPostDate.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
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

  return parseOutput(PostOutputView, post, {async: true})
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

      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: The content is serialized and sanitized by react-dom/server */}
      <div dangerouslySetInnerHTML={{__html: post.content}} />
    </article>
  )
}

export default PostViewPage
