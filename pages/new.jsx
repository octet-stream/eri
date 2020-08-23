import {Fragment} from "react"

import Title from "component/Title"

import Login from "component/Login"

function NewPost() {
  return (
    <Fragment>
      <Title title="New post" />

      <Login />
    </Fragment>
  )
}

export default NewPost
