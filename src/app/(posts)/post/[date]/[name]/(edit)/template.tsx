import type {ReactNode} from "react"

import {AFC} from "lib/type/AsyncFunctionComponent"
import {ServerSession} from "lib/context/ServerSession"

interface Props {
  children: ReactNode
}

const PostEditTemplate: AFC<Props> = async ({children}) => (
  <ServerSession redirectUrl="/auth/login">
    {children}
  </ServerSession>
)

export default PostEditTemplate
