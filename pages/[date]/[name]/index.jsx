import {Fragment} from "react"

import t from "prop-types"
import toReact from "remark-react"
import mdast from "remark-parse"
import unified from "unified"

import layout from "lib/hoc/layout"
import exec from "lib/graphql/exec"
import getPost from "api/query/post.gql"

import Title from "component/Title"
import BlogLayout from "layout/Blog"

const parser = unified().use(mdast, {commonmark: true}).use(toReact)

/**
 * @type {import("next").GetServerSideProps}
 */
export const getServerSideProps = async ctx => {
  const {date, name} = ctx.params

  const {data, errors} = await exec({
    ctx,
    query: getPost,
    variables: {
      slug: [date, name].join("/")
    }
  })

  return {
    props: {
      errors: errors ?? [],
      post: data?.post
    }
  }
}

/**
 * @type {React.FC<{}>}
 */
const Post = ({post}) => (
  <Fragment>
    <Title title={post.title} />

    <main>
      <h1>{post.title}</h1>

      <article>{parser.processSync(post.text).result}</article>
    </main>
  </Fragment>
)

Post.propTypes = {
  post: t.shape({
    title: t.string,
    text: t.string
  }).isRequired,
}

export default Post |> layout(BlogLayout)
