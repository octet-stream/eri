import auth from "lib/auth/isAuthenticated"
import exec from "lib/graphql/exec"
import layout from "lib/hoc/layout"

import EditorLayout from "layout/Editor"
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

function Edit() {
  return <div>Post editor will be here</div>
}

export default Edit |> layout(EditorLayout) |> withLogin
