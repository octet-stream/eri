import type {FC, ReactNode, ReactElement} from "react"
import {useSession} from "next-auth/react"

import {Redirect} from "component/Redirect"

interface Props {
  header: ReactElement<any, any>
  children: ReactNode
}

/**
 * Base layout for pages with post editor
 */
export const EditorLayout: FC<Props> = ({header, children}) => {
  const session = useSession()

  if (session.status === "unauthenticated") {
    return <Redirect url="/auth/login" />
  }

  return (
    <div className="w-screen min-h-screen flex py-5 desktop:p-5">
      <main className="flex flex-1 flex-col prose mx-auto">
        {header}

        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  )
}
