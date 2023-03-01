import type {FC, ReactNode, ReactElement} from "react"
import {useSession} from "next-auth/react"

import {Redirect} from "component/Redirect"

import {BaseLayout} from "./BaseLayout"

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
    <BaseLayout>
      {header}

      <div className="flex-1">
        {children}
      </div>
    </BaseLayout>
  )
}
