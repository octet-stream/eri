import type {FC, ReactNode} from "react"
import {Fragment} from "react"

import Head from "next/head"

interface Props {
  title: string
  children: ReactNode
}

export const PostLayout: FC<Props> = ({title, children}) => (
  <Fragment>
    <Head>
      <title>{title}</title>
    </Head>

    <article className="prose h-screen py-5 laptop:p-5 mx-auto">
      {children}
    </article>
  </Fragment>
)
