import {useSession} from "next-auth/react"
import type {FC, ReactNode} from "react"

import {Redirect} from "component/Redirect"
import {NewPostHeader} from "component/Header/NewPostHeader"

interface Props {
  children: ReactNode
}

export const EditorLayout: FC<Props> = ({children}) => {
  const session = useSession()

  if (session.status === "unauthenticated") {
    return <Redirect url="/auth/login" />
  }

  return (
    <div className="w-screen min-h-screen flex py-5 desktop:p-5">
      <main className="flex flex-1 flex-col prose mx-auto">
        <NewPostHeader />

        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
