import {Fragment} from "react"

import t from "prop-types"

import layout from "lib/hoc/layout"
import exec from "lib/graphql/exec"
import getPost from "api/query/post.gql"

import Title from "component/Title"
import BlogLayout from "layout/Blog"

export async function getServerSideProps(ctx) {
  const {params} = ctx

  const {data, errors} = await exec({
    ctx,
    query: getPost,
    variables: {
      slug: [params.date, params.name].join("/")
    }
  })

  return {
    props: {
      errors: errors || {},
      post: data.post
    }
  }
}

function Post({post}) {
  return (
    <Fragment>
      <Title title={post.title} />

      <div>
        <h1>{post.title}</h1>

        <article>{post.text}</article>
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  post: t.shape({
    title: t.string,
    text: t.string
  }).isRequired,
}

export default Post |> layout(BlogLayout)
