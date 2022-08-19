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

    <div className="w-screen h-screen">
      <main className="prose h-full py-5 laptop:p-5 mx-auto flex flex-col">
        {children}
      </main>
    </div>

  </Fragment>
)
