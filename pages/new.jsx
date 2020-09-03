import {Fragment} from "react"

import auth from "lib/auth/isAuthenticated"
import layout from "lib/hoc/layout"

import BlogLayout from "layout/Blog"

import Title from "component/Title"
import Editor from "component/Post/Editor"
import withLogin from "component/Login/withLogin"

export async function getServerSideProps(ctx) {
  return {
    props: {
      isAuthenticated: await auth(ctx)
    }
  }
}

function NewPost() {
  return (
    <Fragment>
      <Title titleTemplate="%s - New post" />

      <Editor />
    </Fragment>
  )
}

export default NewPost |> layout(BlogLayout) |> withLogin
