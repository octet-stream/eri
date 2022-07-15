import type {FC, ReactNode} from "react"
import {Fragment} from "react"

import Head from "next/head"

interface Props {
  title: string
  children: ReactNode
}

export const AuthLayout: FC<Props> = ({title, children}) => (
  <Fragment>
    <Head>
      <title>{title}</title>
    </Head>

    <div className="w-screen h-screen flex justify-center items-center mobile:p-5">
      <div className="w-[320px]">
        <div className="mb-6 text-2xl font-semibold text-center">
          {title}
        </div>

        {children}
      </div>
    </div>
  </Fragment>
)
