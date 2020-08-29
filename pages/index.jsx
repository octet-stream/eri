import t from "prop-types"

import layout from "lib/hoc/layout"
import exec from "lib/graphql/exec"

import BlogLayout from "layout/Blog"

import getPosts from "api/query/posts.gql"

export async function getServerSideProps(ctx) {
  const {data, errors} = await exec({ctx, query: getPosts})

  return {
    props: {
      errors: errors ?? [],
      posts: data?.posts
    }
  }
}

function Home({posts}) {
  return (
    <div>
      {
        do {
          if (posts.list.length) {
            <ul>
              {
                posts.list.map(post => (
                  <li key={post.id}>
                    {post.title}
                  </li>
                ))
              }
            </ul>
          } else {
            <div>There is no posts</div>
          }
        }
      }
    </div>
  )
}

Home.propTypes = {
  posts: t.shape().isRequired
}

export default Home |> layout(BlogLayout)
