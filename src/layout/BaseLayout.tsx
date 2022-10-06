import type {FC, ReactNode} from "react"
import {Fragment} from "react"

import Head from "next/head"

export interface BaseLayoutProps {
  title?: string
  children: ReactNode
}

export const BaseLayout: FC<BaseLayoutProps> = ({title, children}) => (
  <Fragment>
    {title && (
      <Head>
        <title>{title}</title>
      </Head>
    )}

    <div className="w-screen min-h-screen flex">
      <main className="prose py-5 laptop:p-5 mx-auto flex flex-1 flex-col">
        {children}
      </main>
    </div>

  </Fragment>
)
