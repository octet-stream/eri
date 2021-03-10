import {useApolloClient} from "@apollo/client"
import {GetServerSidePropsContext} from "next"
import {useRouter} from "next/router"
import {FC} from "react"

import withError from "lib/error/withError"
import auth from "lib/auth/isAuthenticated"
import layout from "lib/hoc/layout"

import {exec, ExecOperationResult} from "lib/graphql/exec"

import EditorLayout from "layout/Editor"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

import getPost from "api/query/post.gql"
import update from "api/mutation/post/update.gql"
import remove from "api/mutation/post/remove.gql"

import PostPayload from "type/api/PostPayload"

type PagePayload = ExecOperationResult<PostPayload>

export const getServerSideProps = withError(async (ctx: GetServerSidePropsContext) => {
  const {date, name} = ctx.params

  const [isAuthenticated, response] = await Promise.all([
    auth(ctx),
    exec<PostPayload>({
      ctx,
      query: getPost,
      variables: {
        slug: [date, name].join("/")
      }
    })
  ])

  return {
    props: {
      ...response, isAuthenticated,
    }
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
