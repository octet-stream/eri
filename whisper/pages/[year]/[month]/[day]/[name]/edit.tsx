import {useApolloClient, QueryResult} from "@apollo/client"
import {GetServerSidePropsContext} from "next"
import {useRouter} from "next/router"
import {FC} from "react"

import getApollo from "lib/graphql/client/getApollo"
import withError from "lib/error/withError"
import layout from "lib/hoc/layout"

import EditorLayout from "layout/Editor"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

import getPost from "api/query/post.gql"
import update from "api/mutation/post/update.gql"
import remove from "api/mutation/post/remove.gql"

import PostPayload from "type/api/PostPayload"

type PagePayload = QueryResult<PostPayload>

export const getServerSideProps = withError(async (ctx: GetServerSidePropsContext) => {
  const {year, month, day, name} = ctx.params

  const client = getApollo(undefined, ctx.req)

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

const Edit: FC<PagePayload> = ({data: {post}}) => {
  const client = useApolloClient()
  const router = useRouter()

  const onSubmit = updated => client
    .mutate({mutation: update, variables: {post: {...updated, id: post.id}}})
    .then(({data}) => router.push(`/${data.postUpdate.slug}`))
    .catch(console.error)

  const onRemove = () => client
    .mutate({mutation: remove, variables: {id: post.id}})
    .then(() => router.push("/"))
    .catch(console.error)

  return (
    <Editor
      isNew={false}
      title={post.title}
      text={post.text}
      onSubmit={onSubmit}
      onRemove={onRemove}
    />
  )
}

export default withLogin(layout(EditorLayout))(Edit)
