import {SessionProvider} from "next-auth/react"
import {Fragment, useMemo} from "react"
import {Toaster} from "react-hot-toast"
import type {Session} from "next-auth"
import type {AppProps} from "next/app"
import {parse} from "superjson"
import type {FC} from "react"

import Head from "next/head"
import isString from "lodash/isString"

import type {SerializedPageDataProps} from "lib/type/PageDataProps"

import "style/tailwind.css"
import "style/globals.css"

interface PageProps extends SerializedPageDataProps {
  session?: Session | null
}

interface Props extends AppProps {
  pageProps: PageProps
}

const PageContainer: FC<Props> = ({Component, pageProps}) => {
  const {session, ...props} = pageProps

  const data = useMemo<unknown>(
    () => isString(pageProps.data) ? parse(pageProps.data) : pageProps.data,

    [pageProps.data]
  )

  return (
    <Fragment>
      <Head>
        <title>Blog</title>
      </Head>

      <SessionProvider session={session}>
        <Component {...props} data={data} />

        <Toaster position="top-center" />
      </SessionProvider>
    </Fragment>
  )
}

export default PageContainer
