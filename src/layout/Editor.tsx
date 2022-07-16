import {useSession} from "next-auth/react"
import type {FC, ReactNode} from "react"
import {Fragment} from "react"

import Head from "next/head"

import {Redirect} from "component/Redirect"

interface Props {
  title: string
  children: ReactNode
}

export const EditorLayout: FC<Props> = ({title, children}) => {
  const session = useSession()

  if (session.status === "unauthenticated") {
    return <Redirect url="/auth/login" />
  }

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <div className="w-screen h-screen py-5 desktop:p-5 flex justify-center">
        <div className="w-full max-w-laptop">
          {children}
        </div>
      </div>
    </Fragment>
  )
}
