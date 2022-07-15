import {QueryClient, QueryClientProvider} from "react-query"
import {SessionProvider} from "next-auth/react"
import {useState, Fragment} from "react"
import {Toaster} from "react-hot-toast"
import type {Session} from "next-auth"
import type {AppProps} from "next/app"
import type {FC} from "react"

import Head from "next/head"

import {trpcClient, TRPCProvider} from "lib/trpc"

import "styles/globals.css"
import "styles/tailwind.css"

interface PageProps {
  session?: Session | null
}

interface Props extends AppProps {
  pageProps: PageProps
}

const PageContainer: FC<Props> = ({Component, pageProps}) => {
  const [queryClient] = useState(() => new QueryClient())

  const {session, ...props} = pageProps

  return (
    <Fragment>
      <Head>
        <title>Blog</title>
      </Head>

      <TRPCProvider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <Component {...props} />

            <Toaster position="top-center" />
          </SessionProvider>
        </QueryClientProvider>
      </TRPCProvider>
    </Fragment>
  )
}

export default PageContainer
