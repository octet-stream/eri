import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPen} from "@fortawesome/free-solid-svg-icons"
import {Fragment, FC} from "react"

import mdast from "remark-parse"
import toReact from "remark-react"
import unified from "unified"
import Link from "next/link"

import {exec, ExecOperationResult} from "lib/graphql/exec"

import layout from "lib/hoc/layout"
import withError from "lib/error/withError"

import getPost from "api/query/post.gql"

import Title from "component/Title"
import BlogLayout from "layout/Blog"

import PostPayload from "type/api/PostPayload"

type PageProps = ExecOperationResult<PostPayload>

const parser = unified().use(mdast, {commonmark: true}).use(toReact)

export const getServerSideProps = withError(async (ctx: any) => {
  const {date, name} = ctx.params

  const props = await exec<PageProps>({
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
