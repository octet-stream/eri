import {csrfToken} from "next-auth/client"
import {Fragment} from "react"

import Title from "component/Title"

import Login from "component/Login"

// export function getServerSideProps() {
//   return {
//     props: {}
//   }
// }

function NewPost() {
  return (
    <Fragment>
      <Title title="New post" />

      <Login />
    </Fragment>
  )
}

NewPost.getInitialProps = async function getInitialProps(ctx) {
  // console.log(await csrfToken(ctx))
  console.log(csrfToken.toString())

  return {}
}

export default NewPost
