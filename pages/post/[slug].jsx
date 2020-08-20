import exec from "lib/graphql/exec"

import getPost from "api/query/post.gql"

export async function getServerSideProps(ctx) {
  const {params} = ctx

  const {data} = await exec({
    ctx,
    query: getPost,
    variables: {
      slug: params.slug
    }
  })

  return {
    props: {
      post: data.post
    }
  }
}

function Post({post}) {
  return (
    <dic>
      <h1>{post.title}</h1>

      <article>{post.text}</article>
    </dic>
  )
}

export default Post
