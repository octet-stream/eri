import type {FC} from "react"
import {data, generatePath} from "react-router"

import {
  Breadcrumb,
  type BreadcrumbHandle
} from "../components/common/Breadcrumbs.jsx"
import {Heading as CommonHeading} from "../components/common/Heading.jsx"

import {formatPostDate} from "../lib/utils/formatPostDate.js"
import {Post} from "../server/db/entities.js"
import {checkPostPks} from "../server/lib/utils/checkPostPks.js"
import {PostOutputView} from "../server/zod/post/PostOutputView.js"
import {PostSlug} from "../server/zod/post/PostSlug.js"
import {parseInput} from "../server/zod/utils/parseInput.js"
import {parseOutput} from "../server/zod/utils/parseOutput.js"

import {ormContext} from "../server/contexts/orm.js"

import type {Route} from "./+types/_blog.posts.$date.$name.js"

export const loader = async (event: Route.LoaderArgs) => {
  const {params, context} = event

  const orm = context.get(ormContext)

  const slug = await parseInput(PostSlug, params, {async: true})

  await checkPostPks({
    event,
    slug,
    onRedirect: ({post}) => generatePath("/posts/:slug", {slug: post.slug})
  })

  const post = await orm.em.findOneOrFail(
    Post,

    {
      slug
    },

    {
      populate: ["content"],
      failHandler(): never {
        throw data(null, {
          status: 404,
          statusText: "Unable to find post"
        })
      }
    }
  )

  return parseOutput(PostOutputView, post, {async: true})
}

export const meta: Route.MetaFunction = ({data}) => [
  {
    title: data.title
  }
]

export const handle: BreadcrumbHandle = {
  breadcrumb: () => <Breadcrumb>Post</Breadcrumb>
}

const PostViewPage: FC<Route.ComponentProps> = ({loaderData: post}) => (
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

export default PostViewPage
