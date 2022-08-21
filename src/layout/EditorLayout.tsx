import {useSession} from "next-auth/react"
import type {FC, ReactNode} from "react"

import {Redirect} from "component/Redirect"
import {PostHeader} from "component/PostHeader"

interface Props {
  children: ReactNode
}

export const EditorLayout: FC<Props> = ({children}) => {
  const session = useSession()

  if (session.status === "unauthenticated") {
    return <Redirect url="/auth/login" />
  }

  return (
    <div className="w-screen h-screen py-5 desktop:p-5">
      <div className="h-full flex flex-col prose mx-auto">
        <PostHeader />

        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}
