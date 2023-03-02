import {useSession} from "next-auth/react"
import type {FC, ReactNode} from "react"
import {Fragment} from "react"

import Head from "next/head"

import {useAuthSubmitRedirect} from "lib/hook/useAuthSubmitRedirect"

import {Redirect} from "component/Redirect"

interface Props {
  title: string
  children: ReactNode
  disableRedirect?: boolean
}

export const AuthLayout: FC<Props> = ({
  title,
  children,
  disableRedirect = false
}) => {
  const session = useSession()

  const {destination} = useAuthSubmitRedirect()

  // Will trigger redirect once session changes, so no need to redirect after `signIn()` call
  if (session.status === "authenticated" && !disableRedirect) {
    return <Redirect url={destination} />
  }

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="w-screen h-screen flex justify-center items-center mobile:p-5 dark:text-white">
        <div className="w-72">
          <div className="mb-6 text-2xl font-semibold text-center">
            {title}
          </div>

          {children}
        </div>
      </main>
    </Fragment>
  )
}
