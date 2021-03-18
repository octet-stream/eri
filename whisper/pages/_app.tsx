import {ApolloProvider} from "@apollo/client"
import {useEffect, useState, FC} from "react"
import {Toaster} from "react-hot-toast"
import {useRouter} from "next/router"
import {Helmet} from "react-helmet"
import {AppProps} from "next/app"

import "style/globals.css"
import "style/spacing.css"
import "style/colors.css"

import useApollo from "lib/graphql/client/useApollo"

import Viewer from "context/Viewer"

import Progress from "component/Progress"
import DarkMode from "component/DarkMode"
import PageError from "component/Error/PageError"

const baseTitle = process.env.NEXT_PUBLIC_BLOG_NAME

const App: FC<AppProps> = ({Component, pageProps}) => {
  const {initialApolloState, error, ...renderProps} = pageProps

  const [isAnimatingProgress, setIsAnimatingProgress] = useState(false)

  const {events} = useRouter()

  const client = useApollo(initialApolloState)

  useEffect(() => {
    const start = () => setIsAnimatingProgress(true)

    const end = () => setIsAnimatingProgress(false)

    events.on("routeChangeStart", start)
    events.on("routeChangeComplete", end)
    events.on("routeChangeError", end)

    return () => {
      end()
      events.off("routeChangeStart", start)
      events.off("routeChangeComplete", end)
      events.off("routeChangeError", end)
    }
  }, [])

  return (
    <DarkMode>
      <Helmet
        htmlAttributes={{lang: "en"}}
        defaultTitle={baseTitle}
        meta={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          },
          {
            name: "og:title",
            content: baseTitle
          }
        ]}
      />

      <ApolloProvider client={client}>
        <PageError error={error}>
          <Viewer.Provider value={pageProps?.data?.viewer}>
            <Component {...renderProps} />
          </Viewer.Provider>
        </PageError>
      </ApolloProvider>

      <Progress isAnimating={isAnimatingProgress} />

      <Toaster position="bottom-left" />
    </DarkMode>
  )
}

export default App
