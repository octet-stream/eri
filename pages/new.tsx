import {GetServerSideProps} from "next"
import {useApolloClient} from "@apollo/client"
import {useRouter} from "next/router"
import {Fragment, FC} from "react"

import auth from "lib/auth/isAuthenticated"
import layout from "lib/hoc/layout"

import add from "api/mutation/post/add.gql"

import EditorLayout from "layout/Editor"

import Title from "component/Title"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

type PageProps = GetServerSideProps<{isAuthenticated: boolean}>

export const getServerSideProps: PageProps = async ctx => ({
  props: {
    isAuthenticated: await auth(ctx)
  }
})

const NewPost: FC = () => {
  const router = useRouter()
  const client = useApolloClient()

  const submit = (post: any) => client
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
