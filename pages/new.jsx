import {Fragment} from "react"

import auth from "lib/auth/isAuthenticated"
import layout from "lib/hoc/layout"

import EditorLayout from "layout/Editor"

import Title from "component/Title"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

/**
 * @param {import("next").GetServerSidePropsContext} ctx
 */
export async function getServerSideProps(ctx) {
  return {
    props: {
      isAuthenticated: await auth(ctx)
    }
  }
}

/**
 * @type {React.FunctionComponent<{}>}
 */
const NewPost = () => (
  <Fragment>
    <Title titleTemplate="%s - New post" />

    <Editor />
  </Fragment>
)

export default NewPost |> layout(EditorLayout) |> withLogin
