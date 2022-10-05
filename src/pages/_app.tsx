import {QueryClient, QueryClientProvider} from "react-query"
import {useState, Fragment} from "react"
import {SessionProvider} from "next-auth/react"
import {Toaster} from "react-hot-toast"
import type {Session} from "next-auth"
import type {AppProps} from "next/app"
import type {FC} from "react"

import Head from "next/head"

import {trpcClient, TRPCProvider} from "lib/trpc"
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

  const [queryClient] = useState(() => new QueryClient())

  return (
    <Fragment>
      <Head>
        <title>Blog</title>
      </Head>

      <TRPCProvider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <PageDataProvider data={props.data}>
              <Component {...props} />
            </PageDataProvider>

            <Toaster position="top-center" />
          </SessionProvider>
        </QueryClientProvider>
      </TRPCProvider>
    </Fragment>
  )
}

export default PageContainer
