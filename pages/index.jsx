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
  const props = await exec({ctx, query: getPosts})

  return {
    props
  }
}

/**
 * @type {React.FC<{}>}
 */
const Home = ({data}) => {
  const {posts} = data

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
  data: t.shape({posts: t.shape()}).isRequired
}

export default Home |> layout(BlogLayout)
