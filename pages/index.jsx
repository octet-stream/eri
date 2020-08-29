import {Fragment} from "react"

import t from "prop-types"
import Link from "next/link"

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
    <main>
      {
        do {
          if (posts.list.length) {
            <Fragment>
              {
                posts.list.map(post => (
                  <article key={post.id}>
                    <Link href={post.slug}>
                      <a>{post.title}</a>
                    </Link>
                  </article>
                ))
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
