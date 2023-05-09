import {getServerSession} from "next-auth/next"
import {redirect} from "next/navigation"
import type {ReactNode} from "react"

import {options} from "app/api/auth/[...nextauth]/route"

import type {AFC} from "lib/type/AsyncFunctionComponent"

import {Layout} from "../_/component/Layout"

interface Props {
  children: ReactNode
}

const AuthLayout: AFC<Props> = async ({children}) => {
  // Redirect use if already authorized
  if (await getServerSession(options)) {
    redirect("/")
  }

  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default AuthLayout
