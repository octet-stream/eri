import {useApolloClient} from "@apollo/client"
import {useRouter} from "next/router"
import {Fragment} from "react"

import auth from "lib/auth/isAuthenticated"
import layout from "lib/hoc/layout"

import add from "api/mutation/post/add.gql"

import EditorLayout from "layout/Editor"

import Title from "component/Title"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

/**
 * @type {import("next").GetServerSideProps<{isAuthenticated: boolean}>}
 */
export const getServerSideProps = async ctx => ({
  props: {
    isAuthenticated: await auth(ctx)
  }
})

/**
 * @type {React.FC<{}>}
 */
const NewPost = () => {
  const router = useRouter()
  const client = useApolloClient()

  const submit = post => client
    .mutate({mutation: add, variables: {post}})
    .then(({data}) => router.push(data.postAdd.slug))
    .catch(console.error)

  return (
    <Fragment>
      <Title titleTemplate="%s - New post" />

      <Editor onSubmit={submit} />
    </Fragment>
  )
}

export default NewPost |> layout(EditorLayout) |> withLogin
