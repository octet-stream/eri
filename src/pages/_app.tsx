import {SessionProvider} from "next-auth/react"
import {Fragment} from "react"
import {Toaster} from "react-hot-toast"
import type {Session} from "next-auth"
import type {AppProps} from "next/app"
import type {FC} from "react"

import Head from "next/head"

import {PageDataProvider} from "lib/context/PageDataContext"

import "style/globals.css"
import "style/tailwind.css"

interface PageProps {
  session?: Session | null
  data?: string
}

interface Props extends AppProps {
  pageProps: PageProps
}

const PageContainer: FC<Props> = ({Component, pageProps}) => {
  const {session, ...props} = pageProps

  return (
    <Fragment>
      <Head>
        <title>Blog</title>
      </Head>

      <SessionProvider session={session}>
        <PageDataProvider data={props.data}>
          <Component {...props} />
        </PageDataProvider>

        <Toaster position="top-center" />
      </SessionProvider>
    </Fragment>
  )
}

export default PageContainer
