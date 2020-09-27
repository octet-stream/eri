import t from "prop-types"

import auth from "lib/auth/isAuthenticated"
import exec from "lib/graphql/exec"
import layout from "lib/hoc/layout"

import EditorLayout from "layout/Editor"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

import getPost from "api/query/post.gql"

/**
 * @typedef {Object} Post
 *
 * @prop {string} title
 * @prop {string} text
 * @prop {boolean} isDraft
 */

/**
 * @type {import("next").GetServerSideProps<{post: Post, isAuthenticated: boolean}>} ctx
 */
export const getServerSideProps = async ctx => {
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

/**
 * @type {React.FC<{post: Post}>}
 */
const Edit = ({post}) => {
  /**
   * @param {Post} data
   */
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
