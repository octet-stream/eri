import {GetServerSidePropsResult, GetServerSidePropsContext} from "next"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPen} from "@fortawesome/free-solid-svg-icons"
import {ApolloQueryResult} from "@apollo/client"
import {Fragment, FC} from "react"

import mdast from "remark-parse"
import toReact from "remark-react"
import unified from "unified"
import Link from "next/link"

import getApollo from "lib/graphql/client/getApollo"
import withError from "lib/error/withError"
import layout from "lib/hoc/layout"

import getPost from "api/query/post.gql"

import Title from "component/Title"
import BlogLayout from "layout/Blog"

import PostPayload from "type/api/PostPayload"

type PageProps = ApolloQueryResult<PostPayload>

const parser = unified().use(mdast).use(toReact)

export const getServerSideProps = withError(async (
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PageProps>> => {
  const client = getApollo(undefined, ctx.req)

  const {year, month, day, name} = ctx.params

  const props = await client.query<PostPayload>({
    query: getPost,
    variables: {
      slug: [year, month, day, name].join("/")
    }
  })

  return {
    props
  }
})

const Post: FC<PageProps> = ({data: {post}}) => (
  <Fragment>
    <Title title={post.title} />

    <main>
      <h1>
        <span>{post.title} </span>

        <Link href={`/${post.slug}/edit`}>
          <a>
            <FontAwesomeIcon icon={faPen} />
          </a>
        </Link>
      </h1>

      <article>{parser.processSync(post.text).result}</article>
    </main>
  </Fragment>
)

export default layout(BlogLayout)(Post)
