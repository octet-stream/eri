import t from "prop-types"

import auth from "lib/auth/isAuthenticated"
import exec from "lib/graphql/exec"
import layout from "lib/hoc/layout"

import EditorLayout from "layout/Editor"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

import getPost from "api/query/post.gql"

/**
 * @param {import("next").GetServerSidePropsContext} ctx
 */
export async function getServerSideProps(ctx) {
  const {date, name} = ctx.params

  const [isAuthenticated, {data, errors}] = await Promise.all([
    auth(ctx),
    exec({
      ctx,
      query: getPost,
      variables: {
        slug: [date, name].join("/")
      }
    })
  ])

  return {
    props: {
      isAuthenticated,
      errors: errors ?? [],
      post: data?.post
    }
  }
}

function Edit({post}) {
  const submit = data => console.log(data)

  return <Editor title={post.title} text={post.text} onSubmit={submit} />
}

Edit.propTypes = {
  post: t.shape({
    title: t.string,
    text: t.string
  }).isRequired,
}

export default Edit |> layout(EditorLayout) |> withLogin
