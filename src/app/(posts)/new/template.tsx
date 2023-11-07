import type {ReactNode} from "react"
import type {Metadata} from "next"

import {AFC} from "lib/type/AsyncFunctionComponent"
import {ServerSession} from "lib/context/ServerSession"

interface Props {
  children: ReactNode
}

export const metadata: Metadata = {
  title: {
    absolute: "Untitled"
  }
}

const PostNewTemplate: AFC<Props> = async ({children}) => (
  <ServerSession redirectUrl="auth/login">
    {children}
  </ServerSession>
)

export default PostNewTemplate
