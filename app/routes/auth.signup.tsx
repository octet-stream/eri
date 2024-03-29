import type {MetaFunction} from "@remix-run/node"
import {FC} from "react"

export const meta: MetaFunction = () => [
  {
    title: "Signup"
  }
]

// TODO: Implement authentication, registration and authorization
const SignUpPage: FC = () => (
  <div>
    Signup page will be here
  </div>
)

export default SignUpPage
