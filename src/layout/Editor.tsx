import {useSession} from "next-auth/react"
import type {FC, ReactNode} from "react"

import {Redirect} from "component/Redirect"

interface Props {
  children: ReactNode
}

export const EditorLayout: FC<Props> = ({children}) => {
  const session = useSession()

  if (session.status === "unauthenticated") {
    return <Redirect url="/auth/login" />
  }

  return (
    <div className="w-screen h-screen py-5 desktop:p-5 flex justify-center">
      <div className=" w-full prose">
        {children}
      </div>
    </div>
  )
}
