import {Fragment, useEffect, useState} from "react"
import {useRouter} from "next/router"
import {Helmet} from "react-helmet"

import t from "prop-types"

import "style/globals.css"
import "style/spacing.css"
import "style/colors.css"

import Progress from "component/Progress"

const baseTitle = "Eri's Blog"

function App({Component, pageProps}) {
  const [isAnimatingProgress, setIsAnimatingProgress] = useState(false)
  const {events} = useRouter()

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
    <Fragment>
      <Helmet
        htmlAttributes={{lang: "en"}}
        defaultTitle={baseTitle}
        title={baseTitle}
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

      <Component {...pageProps} />

      <Progress isAnimating={isAnimatingProgress} />
    </Fragment>
  )
}

App.propTypes = {
  Component: t.func.isRequired,
  pageProps: t.shape().isRequired
}

export default App
