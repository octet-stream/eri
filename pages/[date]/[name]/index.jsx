import {Fragment} from "react"

import t from "prop-types"
import mdast from "remark-parse"
import toReact from "remark-react"
import unified from "unified"
import Link from "next/link"

import layout from "lib/hoc/layout"
import exec from "lib/graphql/exec"
import serializeError from "lib/graphql/exec/serializeErrorDecorator"

import getPost from "api/query/post.gql"

import Title from "component/Title"
import BlogLayout from "layout/Blog"

const parser = unified().use(mdast, {commonmark: true}).use(toReact)

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = serializeError(async ctx => {
  const {date, name} = ctx.params

  const props = await exec({
    ctx,
    query: getPost,
    variables: {
      slug: [date, name].join("/")
    }
  })

  return {
    props
  }
})

/**
 * @type {React.FC<{}>}
 */
const Post = ({data: {post}}) => (
  <Fragment>
    <Title title={post.title} />

    <main>
      <h1>
        <span>{post.title} </span>

        (
        <Link href="/[date]/[name]/edit" as={`/${post.slug}/edit`}>
          <a>edit</a>
        </Link>
        )
      </h1>

      <article>{parser.processSync(post.text).result}</article>
    </main>
  </Fragment>
)

Post.propTypes = {
  data: t.shape({
    post: t.shape({
      id: t.number,
      title: t.string,
      text: t.string,
      slug: t.string
    }),
  }).isRequired
}

export default Post |> layout(BlogLayout)
