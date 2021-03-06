import {GetServerSidePropsContext} from "next"
import {useApolloClient} from "@apollo/client"
import {useRouter} from "next/router"
import {toast} from "react-hot-toast"
import {Fragment, FC} from "react"

import layout from "lib/hoc/layout"
import withError from "lib/error/withError"
import getApollo from "lib/graphql/client/getApollo"

import getViewer from "api/query/viewer.gql"
import add from "api/mutation/post/add.gql"

import EditorLayout from "layout/Editor"

import Title from "component/Title"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

export const getServerSideProps = withError(
  async ({req}: GetServerSidePropsContext) => {
    const client = getApollo(undefined, req)

    const props = await client.query({query: getViewer})

    return {
      props
    }
  }
)

const NewPost: FC = () => {
  const router = useRouter()
  const client = useApolloClient()

  const submit = (post: any) => client
    .mutate({mutation: add, variables: {post}})
    .then(({data}) => {
      if (data.postAdd.isDraft === false) {
        router.push(data.postAdd.slug)
      }
    })
    .catch(error => {
      toast.error("Can't save the post.")

      console.error(error)
    })

  return (
    <Fragment>
      <Title titleTemplate="%s - New post" />

      <Editor onSubmit={submit} />
    </Fragment>
  )
}

export default layout(EditorLayout)(withLogin(NewPost))
