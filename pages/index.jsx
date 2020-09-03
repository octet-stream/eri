import {Fragment} from "react"

import t from "prop-types"

import layout from "lib/hoc/layout"
import exec from "lib/graphql/exec"

import BlogLayout from "layout/Blog"
import Preview from "component/Post/Preview"

import getPosts from "api/query/posts.gql"

/**
 * @param {import("next").GetServerSidePropsContext} ctx
 */
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
    <main>
      {
        do {
          if (posts.list.length) {
            <Fragment>
              {
                posts.list.map(post => <Preview key={post.id} post={post} />)
              }
            </Fragment>
          } else {
            <div>There is no posts</div>
          }
        }
      }
    </main>
  )
}

Home.propTypes = {
  posts: t.shape().isRequired
}

export default Home |> layout(BlogLayout)
