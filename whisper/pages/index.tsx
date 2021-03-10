import {ApolloQueryResult} from "@apollo/client"
import {GetStaticPropsResult} from "next"
import {Fragment, FC} from "react"

import PostsPayload from "type/api/PostsPayload"

import getApollo from "lib/graphql/client/getApollo"
import withError from "lib/error/withError"
import layout from "lib/hoc/layout"

import BlogLayout from "layout/Blog"
import Preview from "component/Post/Preview"

import getPosts from "api/query/posts.gql"

type PageProps = ApolloQueryResult<PostsPayload>

export const getStaticProps = withError(
  async (): Promise<GetStaticPropsResult<PageProps>> => {
    const client = getApollo()

    const props = await client.query<PostsPayload>({query: getPosts})

    return {
      props,
    }
  }
)

const Home: FC<PageProps> = ({data}) => {
  const {posts} = data

  return (
    <main>
      {
        posts.list.length
          ? (
            <Fragment>
              {posts.list.map(post => <Preview key={post.id} post={post} />)}
            </Fragment>
          )
          : <div>There's no posts</div>
      }
    </main>
  )
}

export default layout(BlogLayout)(Home)
